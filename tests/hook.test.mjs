import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT } from './support/repo.mjs';

const SCRIPT = join(ROOT, 'hooks', 'session-start.sh');

// No Windows o bash vem do Git for Windows e pode não estar no PATH do processo.
function findBash() {
  const candidates = [
    process.env.SDLC_BASH,
    'bash',
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files\\Git\\usr\\bin\\bash.exe',
  ].filter(Boolean);
  return candidates.find((candidate) => spawnSync(candidate, ['--version']).status === 0);
}

const BASH = findBash();
const skip = BASH ? false : 'bash não encontrado (defina SDLC_BASH)';

function runHook({ project, env = {}, root = ROOT }) {
  const result = spawnSync(BASH, [SCRIPT], {
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PLUGIN_ROOT: root, CLAUDE_PROJECT_DIR: project, ...env },
  });
  return { code: result.status, out: result.stdout, err: result.stderr };
}

function withProject(fn) {
  const project = mkdtempSync(join(tmpdir(), 'sdlc-hook-'));
  try {
    return fn(project);
  } finally {
    rmSync(project, { recursive: true, force: true });
  }
}

// Roda o hook com PATH reduzido ao diretório dos utilitários básicos (onde está o `cat`).
// O próprio bash calcula esse diretório, porque no Windows ele usa caminhos MSYS (/usr/bin).
function runHookWithMinimalPath(project) {
  const command = 'PATH="$(dirname "$(command -v cat)")"; export PATH; command -v codex >/dev/null && echo CODEX_NO_PATH_MINIMO; exec "$BASH" "$0"';
  const result = spawnSync(BASH, ['-c', command, SCRIPT], {
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PLUGIN_ROOT: ROOT, CLAUDE_PROJECT_DIR: project, SDLC_CODEX: 'auto' },
  });
  return { code: result.status, out: result.stdout, err: result.stderr };
}

test('sem estado: injeta o contrato do EM Buddy e informa que não há iniciativa', { skip }, () => {
  withProject((project) => {
    const { code, out } = runHook({ project, env: { SDLC_CODEX: 'unavailable' } });
    assert.equal(code, 0);
    assert.match(out, /# EM Buddy — contrato operacional/);
    assert.match(out, /Raiz do framework: /);
    assert.match(out, /Sem registros de handoff/);
    assert.match(out, /Codex: indisponível \(SDLC_CODEX=unavailable\)/);
    assert.ok(out.split('\n').length < 120, 'saída compacta');
  });
});

function writeEntry(folder, name, title) {
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, name), `---\ndata: x\nstory: s\ntag: OK\n---\n# ${title}\n- Feito: x\n- linha 3\n- linha 4 fora do corte\n`);
}

test('com handoff: injeta os últimos 3 registros do épico mais recente e do projeto, cortados por linhas', { skip }, () => {
  withProject((project) => {
    const epic = join(project, 'docs', 'specs', 'conciliacao', 'handoff');
    for (const n of [1, 2, 3, 4, 5]) writeEntry(epic, `2026-10-18-1${n}00-s${n}.md`, `Épico registro ${n}`);
    writeEntry(join(project, 'docs', 'specs', 'antigo', 'handoff'), '2026-10-17-0900-a.md', 'Épico antigo');
    writeEntry(join(project, '.sdlc', 'handoff'), '2026-10-18-1530-fix.md', 'Correção L1');
    writeEntry(join(project, '.sdlc', 'handoff', 'arquivo'), '2026-01-01-0000-velho.md', 'Arquivado');
    writeFileSync(join(project, '.sdlc', 'project.md'), '# Projeto\n');
    const { code, out } = runHook({ project, env: { SDLC_HANDOFF_LINES: '6', SDLC_CODEX: 'available' } });
    assert.equal(code, 0);
    assert.match(out, /Handoff do épico conciliacao/);
    assert.doesNotMatch(out, /Épico registro [12]\b/, 'só os 3 últimos');
    for (const n of [3, 4, 5]) assert.match(out, new RegExp(`Épico registro ${n}`));
    assert.doesNotMatch(out, /Épico antigo/, 'só o épico mais recente');
    assert.match(out, /Há outros 1 logs de épico/);
    assert.match(out, /Handoff do projeto/);
    assert.match(out, /Correção L1/);
    assert.doesNotMatch(out, /Arquivado/, 'ignora a subpasta arquivo');
    assert.doesNotMatch(out, /fora do corte/, 'corta cada registro em SDLC_HANDOFF_LINES');
    assert.match(out, /Configuração do projeto: \.sdlc\/project\.md/);
    assert.match(out, /Codex: disponível/);
  });
});

test('só o handoff do projeto (L0/L1, sem épico) também é injetado', { skip }, () => {
  withProject((project) => {
    writeEntry(join(project, '.sdlc', 'handoff'), '2026-10-18-1530-fix.md', 'Correção L1');
    const { code, out } = runHook({ project, env: { SDLC_CODEX: 'unavailable' } });
    assert.equal(code, 0);
    assert.doesNotMatch(out, /Handoff do épico/);
    assert.match(out, /Handoff do projeto/);
    assert.match(out, /Correção L1/);
  });
});

test('Codex ausente do PATH é detectado como indisponível e não falha a sessão', { skip }, (t) => {
  withProject((project) => {
    const { code, out, err } = runHookWithMinimalPath(project);
    if (out.includes('CODEX_NO_PATH_MINIMO')) {
      t.skip('o Codex está instalado no mesmo diretório dos utilitários básicos');
      return;
    }
    assert.equal(code, 0, err);
    assert.match(out, /Codex: indisponível\. Sem Codex, tudo segue com Claude/);
  });
});

test('contrato ausente vira aviso, nunca erro de sessão', { skip }, () => {
  withProject((project) => {
    const { code, out } = runHook({ project, root: project, env: { SDLC_CODEX: 'unavailable' } });
    assert.equal(code, 0);
    assert.match(out, /\[ATENÇÃO\] Contrato do EM Buddy não encontrado/);
  });
});

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
    assert.match(out, /Sem \.sdlc\/state\.md/);
    assert.match(out, /Codex: indisponível \(SDLC_CODEX=unavailable\)/);
    assert.ok(out.split('\n').length < 120, 'saída compacta');
  });
});

test('com estado: injeta o retrato do projeto respeitando o limite de linhas', { skip }, () => {
  withProject((project) => {
    mkdirSync(join(project, '.sdlc'));
    writeFileSync(join(project, '.sdlc', 'state.md'), '# Estado SDLC\n- Fase: Build\n- linha 3\n- linha 4 fora do corte\n');
    writeFileSync(join(project, '.sdlc', 'project.md'), '# Projeto\n');
    const { code, out } = runHook({ project, env: { SDLC_STATE_LINES: '3', SDLC_CODEX: 'available' } });
    assert.equal(code, 0);
    assert.match(out, /- Fase: Build/);
    assert.doesNotMatch(out, /fora do corte/);
    assert.match(out, /Configuração do projeto: \.sdlc\/project\.md/);
    assert.match(out, /Codex: disponível/);
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

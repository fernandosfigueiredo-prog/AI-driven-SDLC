import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { frontmatter } from './support/repo.mjs';
import { buildEntry, HandoffInputError, main, parseArgs, stamp, writeEntry } from '../scripts/handoff.mjs';

const NOW = new Date(2026, 9, 18, 16, 40, 59);

function withProject(fn) {
  const root = mkdtempSync(join(tmpdir(), 'sdlc-handoff-'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('o horário vem do relógio e o nome ordena cronologicamente', () => {
  assert.deepEqual(stamp(NOW), { day: '2026-10-18', time: '164059', human: '2026-10-18 16:40', file: '2026-10-18-164059' });
  assert.ok(stamp(new Date(2026, 9, 18, 9, 5, 7)).file < stamp(new Date(2026, 9, 18, 16, 40, 0)).file);
});

test('registro completo: frontmatter válido e campos do template', () => {
  const text = buildEntry(
    { story: 'conciliar-extrato', title: 'Story 1 concluída', feito: 'x', evidencia: 'npm test → 21/21', proxima: 'refinar a story 2', author: 'Claude Code / Sonnet 5.5', level: 'L2' },
    NOW,
  );
  const meta = frontmatter(text);
  assert.deepEqual(meta, { data: '2026-10-18 16:40', autor: 'Claude Code / Sonnet 5.5', story: 'conciliar-extrato', tag: 'OK', nivel: 'L2' });
  assert.match(text, /^# Story 1 concluída$/m);
  assert.match(text, /- \*\*Feito:\*\* x/);
  assert.match(text, /- \*\*Próxima ação:\*\* refinar a story 2/);
  assert.doesNotMatch(text, /Atenção/, 'campos vazios não aparecem');
});

test('L2/L3 exigem próxima ação e BLOQUEADO exige a decisão humana', () => {
  assert.throws(() => buildEntry({ title: 't', feito: 'x' }, NOW), /--level é obrigatório/);
  assert.throws(() => buildEntry({ title: 't', feito: 'x', level: 'L2' }, NOW), /exige --proxima/);
  assert.throws(() => buildEntry({ title: 't', feito: 'x', level: 'L3' }, NOW), /exige --proxima/);
  assert.throws(() => buildEntry({ title: 't', feito: 'x', level: 'L1', tag: 'BLOQUEADO' }, NOW), /exige --decisoes/);
  assert.doesNotThrow(() => buildEntry({ title: 't', feito: 'x', level: 'L1' }, NOW));
  assert.doesNotThrow(() => buildEntry({ title: 't', feito: 'x', level: 'L2', proxima: 'p', tag: 'BLOQUEADO', decisoes: 'd' }, NOW));
});

test('grava no épico ou no projeto, imprime o caminho e nunca sobrescreve', () => {
  withProject((root) => {
    const first = writeEntry({ root, epic: 'conciliacao', story: 's1', level: 'L1', title: 't', feito: 'a' }, NOW);
    assert.equal(first, join(root, 'docs', 'specs', 'conciliacao', 'handoff', '2026-10-18-164059-s1.md'));
    const second = writeEntry({ root, epic: 'conciliacao', story: 's1', level: 'L1', title: 't', feito: 'b' }, NOW);
    assert.equal(second, join(root, 'docs', 'specs', 'conciliacao', 'handoff', '2026-10-18-164100-s1.md'), 'colisão avança 1 s');
    assert.ok(readdirSync(join(root, 'docs', 'specs', 'conciliacao', 'handoff')).sort().at(-1).includes('164100'), 'o mais novo ordena por último');
    assert.match(readFileSync(first, 'utf8'), /Feito:\*\* a/, 'o primeiro registro segue intacto');

    const project = writeEntry({ root, title: 'Correção', feito: 'corrigido (abc1234)', level: 'L0' }, NOW);
    assert.equal(project, join(root, '.sdlc', 'handoff', '2026-10-18-164059-geral.md'));
    assert.equal(readdirSync(join(root, 'docs', 'specs', 'conciliacao', 'handoff')).length, 2);
  });
});

test('entrada inválida gera erro claro e não cria arquivo', () => {
  withProject((root) => {
    assert.throws(() => writeEntry({ root, level: 'L1', title: 't' }, NOW), /--feito é obrigatório/);
    assert.throws(() => writeEntry({ root, level: 'L1', feito: 'x' }, NOW), /--title é obrigatório/);
    assert.throws(() => writeEntry({ root, level: 'L1', title: 't', feito: 'x', tag: 'CRÍTICO' }, NOW), HandoffInputError);
    assert.throws(() => writeEntry({ root, level: 'L1', title: 't', feito: 'x', story: 'Minha Story' }, NOW), /slug/);
    assert.throws(() => writeEntry({ root, level: 'L1', title: 't', feito: 'x', epic: '../fora' }, NOW), /slug/);
    assert.equal(existsSync(join(root, '.sdlc')), false);
  });
});

test('CLI: caminho no stdout, código 0; erro de uso com código 2', () => {
  withProject((root) => {
    let out = '';
    const code = main(['--root', root, '--title', 'Correção', '--feito', 'ok', '--level', 'L0'], { stdout: { write: (text) => (out += text) } });
    assert.equal(code, 0);
    assert.match(out.trim(), /\.sdlc[\\/]handoff[\\/]\d{4}-\d{2}-\d{2}-\d{6}-geral\.md$/);
    assert.ok(existsSync(out.trim()));

    let err = '';
    const bad = main(['--root', root, '--level', 'L1', '--feito', 'x'], { stderr: { write: (text) => (err += text) } });
    assert.equal(bad, 2);
    assert.match(err, /--title é obrigatório/);
    assert.deepEqual(parseArgs(['--story=s1', '--title', 'T']), { story: 's1', title: 'T' });
  });
});

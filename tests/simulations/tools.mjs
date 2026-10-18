// Utilitários das simulações: git, leitura da fixture e checagens reutilizáveis.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export function git(dir, ...args) {
  const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`git ${args.join(' ')}: ${result.stderr}`);
  return result.stdout.trimEnd();
}

export const read = (dir, path) => readFileSync(join(dir, path), 'utf8');
export const exists = (dir, path) => existsSync(join(dir, path));

export function specs(dir) {
  const base = join(dir, 'docs', 'specs');
  if (!existsSync(base)) return [];
  return readdirSync(base)
    .filter((slug) => existsSync(join(base, slug, 'spec.md')))
    .map((slug) => ({ slug, path: `docs/specs/${slug}/spec.md`, planPath: `docs/specs/${slug}/plan.md` }));
}

export function onlySpec(dir) {
  const found = specs(dir);
  if (found.length !== 1) throw new Error(`esperava 1 spec, encontrei ${found.length}`);
  return found[0];
}

export function specStatus(dir) {
  const text = read(dir, onlySpec(dir).path);
  return text.match(/^status:\s*(\S+)/m)?.[1];
}

export function nodeTestsPass(dir) {
  const result = spawnSync('node', ['--test'], { cwd: dir, encoding: 'utf8' });
  return { pass: result.status === 0, detail: result.status === 0 ? undefined : result.stdout.slice(-600) };
}

// Arquivos alterados desde o commit da fixture: commits novos + árvore de trabalho.
export function changedSince(dir, baseCommit) {
  const committed = git(dir, 'diff', '--name-only', `${baseCommit}..HEAD`).split('\n');
  const working = git(dir, 'status', '--porcelain', '--untracked-files=all')
    .split('\n')
    .map((line) => line.slice(3).replace(/^"|"$/g, ''));
  return [...new Set([...committed, ...working].filter(Boolean))].sort();
}

export function srcUnchanged(dir, baseCommit) {
  const touched = changedSince(dir, baseCommit).filter((path) => /^(src|test)\//.test(path));
  return { pass: touched.length === 0, detail: touched.join(', ') || undefined };
}

export function opensWithTag(text) {
  const firstLines = text.trim().split('\n').slice(0, 3).join('\n');
  return { pass: /\[(OK|ATENÇÃO|BLOQUEADO)\]/.test(firstLines), detail: firstLines.slice(0, 160) };
}

export function matches(text, pattern, label = String(pattern)) {
  return { pass: pattern.test(text), detail: pattern.test(text) ? undefined : `não encontrado: ${label}` };
}

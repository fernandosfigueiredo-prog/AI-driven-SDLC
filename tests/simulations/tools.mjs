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

// Registros de handoff: pasta do épico (docs/specs/<slug>/handoff) e do projeto (.sdlc/handoff).
export function handoffEntries(dir) {
  const folders = [join('.sdlc', 'handoff')];
  const specsBase = join(dir, 'docs', 'specs');
  if (existsSync(specsBase)) for (const slug of readdirSync(specsBase)) folders.push(join('docs', 'specs', slug, 'handoff'));
  const entries = [];
  for (const folder of folders) {
    const absolute = join(dir, folder);
    if (!existsSync(absolute)) continue;
    for (const name of readdirSync(absolute).filter((file) => file.endsWith('.md')).sort()) {
      entries.push({ folder, name, text: readFileSync(join(absolute, name), 'utf8') });
    }
  }
  return entries;
}

// Texto da spec, do plano e das stories (épico) de uma iniciativa.
export function refinementText(dir) {
  const { slug } = onlySpec(dir);
  const base = join(dir, 'docs', 'specs', slug);
  let text = existsSync(join(base, 'plan.md')) ? readFileSync(join(base, 'plan.md'), 'utf8') : '';
  const storiesDir = join(base, 'stories');
  if (existsSync(storiesDir)) {
    for (const file of readdirSync(storiesDir)) text += '\n' + readFileSync(join(storiesDir, file), 'utf8');
  }
  return text;
}

export function storyFiles(dir) {
  const { slug } = onlySpec(dir);
  const storiesDir = join(dir, 'docs', 'specs', slug, 'stories');
  return existsSync(storiesDir) ? readdirSync(storiesDir).filter((file) => file.endsWith('.md')) : [];
}

export function specStoryRows(dir) {
  const text = read(dir, onlySpec(dir).path);
  const section = text.split(/^## Stories/m)[1]?.split(/^## /m)[0] ?? '';
  return (section.match(/^\|\s*\d+\s*\|/gm) ?? []).length;
}

// Os registros precisam ter o nome AAAA-MM-DD-HHMMSS-<story>.md, frontmatter e horário real (do relógio).
export function handoffEntriesValid(dir, startedAt) {
  const entries = handoffEntries(dir);
  const problems = [];
  for (const entry of entries) {
    const match = entry.name.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})(\d{2})(\d{2})-/);
    if (!match) {
      problems.push(`${entry.name}: nome fora do formato`);
      continue;
    }
    const stamp = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]), Number(match[6])).getTime();
    if (stamp < startedAt - 5000 || stamp > Date.now() + 5000) problems.push(`${entry.name}: horário fora da janela real`);
    if (!/^---\r?\n(?:[^\n]*\r?\n)*?data: .+\r?\n(?:[^\n]*\r?\n)*?---/.test(entry.text)) problems.push(`${entry.name}: sem frontmatter com data`);
  }
  return { pass: entries.length > 0 && problems.length === 0, detail: problems.join('; ') || `${entries.length} registros` };
}

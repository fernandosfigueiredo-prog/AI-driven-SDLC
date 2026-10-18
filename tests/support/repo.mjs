// Utilitários dos testes de contrato: leitura do repositório e frontmatter.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const IGNORED_DIRS = new Set(['.git', 'node_modules', 'results']);

export function read(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

export function exists(path) {
  return existsSync(join(ROOT, path));
}

export function readJson(path) {
  return JSON.parse(read(path));
}

export function listFiles(dir = '.', predicate = () => true) {
  const found = [];
  const walk = (absolute) => {
    for (const entry of readdirSync(absolute)) {
      if (IGNORED_DIRS.has(entry)) continue;
      const child = join(absolute, entry);
      if (statSync(child).isDirectory()) walk(child);
      else {
        const rel = relative(ROOT, child).split(sep).join('/');
        if (predicate(rel)) found.push(rel);
      }
    }
  };
  walk(join(ROOT, dir));
  return found.sort();
}

// Frontmatter YAML simples: linhas `chave: valor` entre os delimitadores `---`.
export function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return undefined;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (field) fields[field[1]] = field[2].replace(/^"(.*)"$/, '$1').trim();
  }
  return fields;
}

export function body(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

export function splitList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

#!/usr/bin/env node
// Cria um registro de handoff (append-only) com nome, data e frontmatter corretos.
// O horário vem do relógio do sistema, nunca do agente; um registro existente nunca é sobrescrito.
//
//   node scripts/handoff.mjs --story <slug> --title "<título>" [--epic <slug>] [--tag OK|ATENÇÃO|BLOQUEADO]
//     --level L0|L1|L2|L3 [--author "Claude Code / Sonnet 5.5"] [--feito ...] [--evidencia ...] [--estado ...]
//     [--proxima ...] [--decisoes ...] [--atencao ...] [--root <projeto>]
//
// Imprime o caminho criado. L0/L1: informe --level, --story, --title e --feito.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const TAGS = ['OK', 'ATENÇÃO', 'BLOQUEADO'];
const LEVELS = ['L0', 'L1', 'L2', 'L3'];
const SLUG = /^[a-z0-9][a-z0-9-]*$/;

export class HandoffInputError extends Error {}

const pad = (value) => String(value).padStart(2, '0');

export function stamp(date = new Date()) {
  const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const time = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return { day, time, human: `${day} ${pad(date.getHours())}:${pad(date.getMinutes())}`, file: `${day}-${time}` };
}

export function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const raw = argv[index];
    if (!raw.startsWith('--')) throw new HandoffInputError(`argumento inesperado: ${raw}`);
    const [flag, inline] = raw.slice(2).split('=');
    const value = inline ?? argv[(index += 1)];
    if (value === undefined) throw new HandoffInputError(`--${flag} exige valor`);
    options[flag] = value;
  }
  return options;
}

export function buildEntry(options, now = new Date()) {
  const tag = options.tag ?? 'OK';
  const level = options.level;
  const story = options.story ?? 'geral';
  if (!TAGS.includes(tag)) throw new HandoffInputError(`--tag inválida: ${tag}. Use ${TAGS.join(' | ')}`);
  if (!LEVELS.includes(level)) throw new HandoffInputError(`--level é obrigatório e deve ser ${LEVELS.join(' | ')} (recebido: ${level ?? 'nada'})`);
  if (!SLUG.test(story)) throw new HandoffInputError(`--story deve ser um slug em minúsculas com hífens: ${story}`);
  if (!options.title) throw new HandoffInputError('--title é obrigatório');
  if (!options.feito) throw new HandoffInputError('--feito é obrigatório');
  if ((level === 'L2' || level === 'L3') && !options.proxima) {
    throw new HandoffInputError('registro L2/L3 exige --proxima: uma ação concreta que outro executor consiga pegar');
  }
  if (tag === 'BLOQUEADO' && !options.decisoes) {
    throw new HandoffInputError('registro BLOQUEADO exige --decisoes: a decisão humana necessária, com a opção recomendada');
  }

  const lines = [
    '---',
    `data: ${stamp(now).human}`,
    `autor: ${options.author ?? 'Claude Code'}`,
    `story: ${story}`,
    `tag: ${tag}`,
    `nivel: ${level}`,
    '---',
    '',
    `# ${options.title}`,
    '',
    `- **Feito:** ${options.feito}`,
  ];
  const optional = [
    ['Evidência', options.evidencia],
    ['Estado', options.estado],
    ['Próxima ação', options.proxima],
    ['Decisões e pendências humanas', options.decisoes],
    ['Atenção', options.atencao],
  ];
  for (const [label, value] of optional) if (value) lines.push(`- **${label}:** ${value}`);
  return `${lines.join('\n')}\n`;
}

export function writeEntry(options, now = new Date()) {
  const root = resolve(options.root ?? process.cwd());
  if (options.epic !== undefined && !SLUG.test(options.epic)) {
    throw new HandoffInputError(`--epic deve ser um slug em minúsculas com hífens: ${options.epic}`);
  }
  const folder = options.epic ? join(root, 'docs', 'specs', options.epic, 'handoff') : join(root, '.sdlc', 'handoff');
  const content = buildEntry(options, now); // valida antes de tocar no disco
  mkdirSync(folder, { recursive: true });
  const story = options.story ?? 'geral';
  for (let attempt = 0; attempt < 120; attempt += 1) {
    // Colisão (mesmo segundo): avança o relógio em 1 s, o que mantém a ordem cronológica do nome.
    const path = join(folder, `${stamp(new Date(now.getTime() + attempt * 1000)).file}-${story}.md`);
    if (existsSync(path)) continue; // append-only: nunca sobrescreve
    writeFileSync(path, content, { flag: 'wx' });
    return path;
  }
  throw new HandoffInputError('não foi possível criar um nome livre para o registro');
}

export function main(argv = process.argv.slice(2), { stdout = process.stdout, stderr = process.stderr } = {}) {
  try {
    const path = writeEntry(parseArgs(argv));
    stdout.write(`${path}\n`);
    return 0;
  } catch (error) {
    if (error instanceof HandoffInputError) {
      stderr.write(`erro: ${error.message}\n`);
      return 2;
    }
    throw error;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  process.exitCode = main();
}

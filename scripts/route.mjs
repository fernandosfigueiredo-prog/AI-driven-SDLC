#!/usr/bin/env node
// Resolvedor de roteamento do AI-driven SDLC.
// Escolhe tier, modelo, esforço, modo de execução e harness a partir de
// config/routing.json (com override opcional do projeto em .sdlc/routing.json).
// A função resolveRoute é pura; detecção de Codex e leitura de arquivos ficam
// nas bordas (loadConfig, detectCodex, main).
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_CONFIG_PATH = join(HERE, '..', 'config', 'routing.json');

const RISKS = ['L0', 'L1', 'L2', 'L3'];
const LEVELS = ['low', 'medium', 'high'];
const BUDGETS = ['economy', 'normal', 'quality'];

export function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) return override;
  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = key in base ? deepMerge(base[key], value) : value;
  }
  return merged;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function loadConfig({ configPath = DEFAULT_CONFIG_PATH, projectDir } = {}) {
  const base = JSON.parse(readFileSync(configPath, 'utf8'));
  if (!projectDir) return base;
  const overridePath = join(projectDir, '.sdlc', 'routing.json');
  if (!existsSync(overridePath)) return base;
  return deepMerge(base, JSON.parse(readFileSync(overridePath, 'utf8')));
}

export function detectCodex() {
  // No Windows o Codex é um shim .cmd do npm: só resolve via shell, com o comando em string única.
  const options = { encoding: 'utf8', timeout: 5000 };
  const result =
    process.platform === 'win32'
      ? spawnSync('codex --version', { ...options, shell: true })
      : spawnSync('codex', ['--version'], options);
  return result.status === 0;
}

export class RoutingInputError extends Error {}

function requireOneOf(name, value, allowed) {
  if (!allowed.includes(value)) {
    throw new RoutingInputError(`${name} inválido: "${value}". Use um de: ${allowed.join(', ')}`);
  }
}

function normalizeInput(config, input) {
  const request = {
    risk: 'L1',
    complexity: 'medium',
    uncertainty: 'medium',
    budget: 'normal',
    rejections: 0,
    independent: false,
    parallel: false,
    claudeUnavailable: false,
    codexAvailable: false,
    session: undefined,
    // Valores undefined (flags omitidas na CLI) não sobrescrevem os defaults.
    ...Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined)),
  };
  requireOneOf('role', request.role, Object.keys(config.roles));
  requireOneOf('risk', request.risk, RISKS);
  requireOneOf('complexity', request.complexity, LEVELS);
  requireOneOf('uncertainty', request.uncertainty, LEVELS);
  requireOneOf('budget', request.budget, BUDGETS);
  if (!Number.isInteger(request.rejections) || request.rejections < 0) {
    throw new RoutingInputError(`rejections inválido: "${request.rejections}". Use um inteiro >= 0`);
  }
  request.availableModels = request.availableModels ?? config.availableModels;
  return request;
}

class TierLadder {
  constructor(tiers) {
    this.tiers = tiers;
    this.names = Object.keys(tiers).sort((a, b) => tiers[a].rank - tiers[b].rank);
  }

  rank(name) {
    return this.tiers[name].rank;
  }

  byRank(rank) {
    return this.names.find((name) => this.tiers[name].rank === rank);
  }

  clampRank(rank) {
    const ranks = this.names.map((name) => this.rank(name));
    return Math.min(Math.max(rank, Math.min(...ranks)), Math.max(...ranks));
  }

  isAllowed(name, { risk, escalation }) {
    const only = this.tiers[name].useOnlyFor;
    if (!only) return true;
    return (escalation && only.includes('escalation')) || only.includes(risk);
  }

  // Segue a cadeia de fallback até achar um tier cujo modelo esteja disponível.
  firstAvailable(name, availableModels) {
    const seen = new Set();
    const queue = [name];
    while (queue.length > 0) {
      const current = queue.shift();
      if (seen.has(current)) continue;
      seen.add(current);
      if (availableModels.includes(this.tiers[current].model)) return current;
      queue.push(...(this.tiers[current].fallback ?? []));
    }
    return undefined;
  }

  sessionRank(model) {
    const ranks = this.names.filter((name) => this.tiers[name].model === model).map((name) => this.rank(name));
    return ranks.length > 0 ? Math.max(...ranks) : undefined;
  }
}

function computeBaseRank(config, ladder, role, request, reasons) {
  let rank = ladder.rank(role.base);
  reasons.push(`base do papel ${request.role}: ${role.base}`);

  const discountLimit = RISKS.indexOf(config.adjust.lowComplexityDiscountOnlyUpTo);
  const complexityDelta = config.adjust.complexity[request.complexity];
  if (complexityDelta < 0 && RISKS.indexOf(request.risk) > discountLimit) {
    reasons.push(`complexidade baixa não reduz tier em ${request.risk}`);
  } else if (complexityDelta !== 0) {
    rank += complexityDelta;
    reasons.push(`complexidade ${request.complexity}: ${signed(complexityDelta)}`);
  }

  const uncertaintyDelta = config.adjust.uncertainty[request.uncertainty];
  if (uncertaintyDelta !== 0) {
    rank += uncertaintyDelta;
    reasons.push(`incerteza ${request.uncertainty}: ${signed(uncertaintyDelta)}`);
  }

  const budgetDelta = config.adjust.budget[request.budget];
  if (budgetDelta !== 0) {
    rank += budgetDelta;
    reasons.push(`orçamento ${request.budget}: ${signed(budgetDelta)}`);
  }

  const floorTier = role.riskFloor?.[request.risk] ?? config.riskFloor[request.risk];
  if (rank < ladder.rank(floorTier)) {
    rank = ladder.rank(floorTier);
    reasons.push(`piso de risco ${request.risk}: ${floorTier}`);
  }

  if (rank > ladder.rank(role.max)) {
    rank = ladder.rank(role.max);
    reasons.push(`teto do papel ${request.role}: ${role.max}`);
  }

  rank = ladder.clampRank(rank);
  while (!ladder.isAllowed(ladder.byRank(rank), { risk: request.risk, escalation: false })) {
    reasons.push(`tier ${ladder.byRank(rank)} reservado (${ladder.tiers[ladder.byRank(rank)].useOnlyFor.join(', ')})`);
    rank -= 1;
  }
  return rank;
}

function signed(value) {
  return value > 0 ? `+${value}` : String(value);
}

function topEscalationTier(ladder, request) {
  for (const name of [...ladder.names].reverse()) {
    if (!ladder.isAllowed(name, { risk: request.risk, escalation: true })) continue;
    const available = ladder.firstAvailable(name, request.availableModels);
    if (available) return available;
  }
  return undefined;
}

function needsIndependentReview(config, request) {
  if (request.role !== 'review') return false;
  const policy = config.independentReview[request.risk];
  if (policy === 'required') return true;
  if (policy === 'when-risky') {
    return request.independent || request.complexity === 'high' || request.uncertainty === 'high';
  }
  return request.independent;
}

function resolveMode(role, request, ladder, tier, independent, reasons) {
  if (role.mode === 'inline') return { mode: 'inline' };
  if (role.mode === 'fork') return { mode: 'fork', agent: role.agent };

  if (request.role === 'review') {
    if (independent) {
      reasons.push('review independente: subagente com contexto novo');
      return { mode: 'subagent', agent: role.agent };
    }
    reasons.push('review proporcional: autoverificação na sessão');
    return { mode: 'inline' };
  }

  if (request.parallel) {
    reasons.push('tarefa paralela independente: subagente');
    return { mode: 'subagent', agent: role.agent };
  }
  const sessionRank = request.session ? ladder.sessionRank(request.session) : undefined;
  if (sessionRank !== undefined && ladder.rank(tier) < sessionRank) {
    reasons.push(`tier ${tier} abaixo do modelo da sessão (${request.session}): subagente economiza consumo`);
    return { mode: 'subagent', agent: role.agent };
  }
  return { mode: 'inline' };
}

function resolveHarness(config, request, independent, reasons) {
  const codex = config.harnesses.codex;
  const codexUsable = Boolean(codex?.enabled) && request.codexAvailable;

  if (request.claudeUnavailable) {
    if (codexUsable && codex.uses.includes('build-fallback')) {
      reasons.push('Claude indisponível: handoff para Codex');
      return { harness: 'codex', action: 'handoff' };
    }
    reasons.push('Claude indisponível e Codex ausente: checkpoint e aguardar');
    return { harness: 'none', action: 'checkpoint-and-wait' };
  }

  if (independent) {
    if (codexUsable && codex.uses.includes('second-opinion-review')) {
      reasons.push('Codex disponível: segunda opinião de outro fornecedor');
      return { harness: 'claude+codex', action: 'proceed' };
    }
    reasons.push('Codex indisponível ou desativado: independência por contexto novo (mesmo fornecedor)');
  }
  return { harness: 'claude', action: 'proceed' };
}

export function resolveRoute(config, input) {
  const request = normalizeInput(config, input);
  const ladder = new TierLadder(config.tiers);
  const role = config.roles[request.role];
  const reasons = [];
  let action = 'proceed';

  const baseRank = computeBaseRank(config, ladder, role, request, reasons);
  let tier = ladder.firstAvailable(ladder.byRank(baseRank), request.availableModels);
  if (!tier) {
    throw new RoutingInputError('nenhum modelo da cadeia de fallback está disponível');
  }
  if (tier !== ladder.byRank(baseRank)) {
    reasons.push(`modelo ${ladder.tiers[ladder.byRank(baseRank)].model} indisponível: fallback para ${tier}`);
  }

  const threshold = config.escalation.rejectionsToEscalate;
  if (request.rejections > threshold) {
    action = 'escalate-human';
    reasons.push(`${request.rejections} reprovações: além da escalada de tier, decisão humana`);
  } else if (request.rejections === threshold) {
    const top = topEscalationTier(ladder, request);
    if (!top || ladder.rank(top) <= ladder.rank(tier)) {
      action = 'escalate-human';
      reasons.push(`${threshold} reprovações já no tier máximo disponível: decisão humana`);
    } else {
      reasons.push(`${threshold} reprovações: escalada para ${top}`);
      tier = top;
    }
  }

  const independent = needsIndependentReview(config, request);
  const { mode, agent } = resolveMode(role, request, ladder, tier, independent, reasons);
  const harness = resolveHarness(config, request, independent, reasons);
  if (harness.action !== 'proceed') action = harness.action;

  return {
    role: request.role,
    risk: request.risk,
    tier,
    model: ladder.tiers[tier].model,
    effort: ladder.tiers[tier].effort,
    mode,
    ...(agent ? { agent } : {}),
    harness: harness.harness,
    independentReview: independent,
    action,
    reasons,
  };
}

const FLAG_ALIASES = { 'claude-unavailable': 'claudeUnavailable', 'project-dir': 'projectDir' };
const BOOLEAN_FLAGS = new Set(['independent', 'parallel', 'claudeUnavailable', 'brief', 'help']);

export function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const raw = argv[index];
    if (!raw.startsWith('--')) throw new RoutingInputError(`argumento inesperado: ${raw}`);
    const [flag, inlineValue] = raw.slice(2).split('=');
    const key = FLAG_ALIASES[flag] ?? flag;
    if (BOOLEAN_FLAGS.has(key)) {
      options[key] = inlineValue === undefined ? true : inlineValue !== 'false';
      continue;
    }
    const value = inlineValue ?? argv[(index += 1)];
    if (value === undefined) throw new RoutingInputError(`--${flag} exige valor`);
    options[key] = value;
  }
  return options;
}

const USAGE = `Uso: node scripts/route.mjs --role <papel> [--risk L0..L3] [--complexity low|medium|high]
  [--uncertainty low|medium|high] [--budget economy|normal|quality] [--rejections N]
  [--session <modelo da sessão>] [--independent] [--parallel] [--claude-unavailable]
  [--codex auto|available|unavailable] [--models haiku,sonnet,opus] [--project-dir <dir>] [--brief]`;

export function main(argv = process.argv.slice(2), { stdout = process.stdout, stderr = process.stderr } = {}) {
  try {
    const options = parseArgs(argv);
    if (options.help) {
      stdout.write(`${USAGE}\n`);
      return 0;
    }
    const projectDir = resolve(options.projectDir ?? process.cwd());
    const config = loadConfig({ projectDir });
    const codexOption = options.codex ?? process.env.SDLC_CODEX ?? 'auto';
    const codexAvailable = codexOption === 'auto' ? detectCodex() : codexOption === 'available';
    const modelsOption = options.models ?? process.env.SDLC_AVAILABLE_MODELS;
    const route = resolveRoute(config, {
      role: options.role,
      risk: options.risk,
      complexity: options.complexity,
      uncertainty: options.uncertainty,
      budget: options.budget,
      rejections: options.rejections === undefined ? undefined : Number(options.rejections),
      session: options.session,
      independent: options.independent,
      parallel: options.parallel,
      claudeUnavailable: options.claudeUnavailable,
      codexAvailable,
      availableModels: modelsOption ? modelsOption.split(',').map((model) => model.trim()) : undefined,
    });
    if (options.brief) {
      stdout.write(
        `${route.action} · ${route.tier} → ${route.model}/${route.effort} · ${route.mode}` +
          `${route.agent ? ` (${route.agent})` : ''} · harness ${route.harness}\n`,
      );
    } else {
      stdout.write(`${JSON.stringify(route, null, 2)}\n`);
    }
    return 0;
  } catch (error) {
    if (error instanceof RoutingInputError) {
      stderr.write(`erro: ${error.message}\n${USAGE}\n`);
      return 2;
    }
    throw error;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  process.exitCode = main();
}

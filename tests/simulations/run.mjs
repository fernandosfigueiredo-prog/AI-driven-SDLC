#!/usr/bin/env node
// Simulações headless dos fluxos do AI-driven SDLC (testes de aceitação).
// Cada cenário copia uma fixture para um repositório git temporário, roda
// `claude -p` com o plugin carregado por --plugin-dir, continua a mesma sessão
// com --resume quando o fluxo tem vários turnos e confere o resultado com
// checagens determinísticas sobre arquivos, git e testes.
//
// Consome cota (cada passo é uma sessão do Claude Code). Opt-in:
//   node tests/simulations/run.mjs [--only S1,S8] [--model sonnet] [--concurrency 2] [--keep]
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCENARIOS } from './scenarios.mjs';
import { git } from './tools.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FIXTURES = join(ROOT, 'tests', 'fixtures');
const CLAUDE = process.env.CLAUDE_BIN ?? 'claude';

const ALLOWED_TOOLS = [
  'Read',
  'Write',
  'Edit',
  'Glob',
  'Grep',
  'Agent',
  'Skill',
  'TodoWrite',
  'Bash(git:*)',
  'Bash(node:*)',
  'Bash(npm:*)',
  'Bash(cat:*)',
  'Bash(ls:*)',
  'Bash(mkdir:*)',
  'Bash(head:*)',
  'Bash(grep:*)',
  'Bash(wc:*)',
  'Bash(diff:*)',
];
// Sem formulário interativo, rede ou segundo shell: o cenário mede o fluxo, não o ambiente.
const DISALLOWED_TOOLS = ['AskUserQuestion', 'PowerShell', 'WebFetch', 'WebSearch'];

function parseOptions(argv) {
  const options = { model: process.env.SDLC_SIM_MODEL ?? 'sonnet', concurrency: 2, keep: false, only: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === '--keep') options.keep = true;
    else if (flag === '--only') options.only = argv[(index += 1)].split(',');
    else if (flag === '--model') options.model = argv[(index += 1)];
    else if (flag === '--concurrency') options.concurrency = Number(argv[(index += 1)]);
    else throw new Error(`opção desconhecida: ${flag}`);
  }
  return options;
}

function prepareFixture(scenario) {
  const dir = mkdtempSync(join(tmpdir(), `sdlc-sim-${scenario.id.toLowerCase()}-`));
  cpSync(join(FIXTURES, scenario.fixture), dir, { recursive: true });
  git(dir, 'init', '-q', '-b', 'main');
  git(dir, 'config', 'user.email', 'simulacao@example.test');
  git(dir, 'config', 'user.name', 'Simulação SDLC');
  git(dir, 'config', 'core.autocrlf', 'false');
  scenario.setup?.(dir);
  git(dir, 'add', '-A');
  git(dir, 'commit', '-q', '-m', 'fixture');
  return dir;
}

function runClaude(dir, step, options, sessionId) {
  const args = [
    '-p',
    '--output-format',
    'json',
    '--plugin-dir',
    ROOT,
    '--model',
    options.model,
    '--permission-mode',
    'acceptEdits',
    '--strict-mcp-config',
    '--setting-sources',
    'project,local',
    '--max-turns',
    String(step.maxTurns),
    '--max-budget-usd',
    String(step.budgetUsd),
    '--allowedTools',
    ...ALLOWED_TOOLS,
    '--disallowedTools',
    ...DISALLOWED_TOOLS,
  ];
  if (sessionId) args.push('--resume', sessionId);
  // Prompt posicional depois de `--`: comandos de barra enviados por stdin não são expandidos,
  // e as listas variádicas (--allowedTools) consumiriam um argumento solto.
  args.push('--', step.prompt);

  return new Promise((resolvePromise) => {
    const started = Date.now();
    const child = spawn(CLAUDE, args, {
      cwd: dir,
      env: { ...process.env, SDLC_CODEX: 'unavailable', ...step.env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill(), step.timeoutMs ?? 10 * 60 * 1000);
    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('close', (code) => {
      clearTimeout(timer);
      let meta = {};
      try {
        meta = JSON.parse(stdout);
      } catch {
        meta = { result: stdout, parseError: true };
      }
      resolvePromise({
        code,
        text: meta.result ?? '',
        sessionId: meta.session_id ?? sessionId,
        costUsd: meta.total_cost_usd ?? null,
        turns: meta.num_turns ?? null,
        subtype: meta.subtype ?? null,
        isError: meta.is_error ?? code !== 0,
        durationMs: Date.now() - started,
        stderr: stderr.slice(-4000),
      });
    });
    child.stdin.end();
  });
}

async function runScenario(scenario, options, resultsDir) {
  const dir = prepareFixture(scenario);
  const baseCommit = git(dir, 'rev-parse', 'HEAD');
  const context = { dir, baseCommit, sessionId: undefined, notes: {}, sessionCost: {} };
  const report = { id: scenario.id, title: scenario.title, acceptance: scenario.acceptance, dir, steps: [] };
  const scenarioDir = join(resultsDir, scenario.id);
  mkdirSync(scenarioDir, { recursive: true });

  for (const [index, step] of scenario.steps.entries()) {
    step.before?.(context);
    const sessionId = step.newSession ? undefined : context.sessionId;
    const run = await runClaude(dir, step, options, sessionId);
    if (!step.keepSession) context.sessionId = run.sessionId;
    // total_cost_usd é acumulado por sessão: o custo do passo é a diferença para o passo anterior da mesma sessão.
    const previousCost = sessionId ? (context.sessionCost[run.sessionId] ?? 0) : 0;
    const stepCost = run.costUsd === null ? null : run.costUsd - previousCost;
    if (run.costUsd !== null) context.sessionCost[run.sessionId] = run.costUsd;
    const checks = step.checks.map((check) => {
      try {
        const outcome = check.run(run, context);
        return { name: check.name, pass: outcome === true || outcome?.pass === true, detail: outcome?.detail };
      } catch (error) {
        return { name: check.name, pass: false, detail: String(error.message ?? error) };
      }
    });
    const stepReport = {
      step: step.name,
      acceptance: step.acceptance,
      subtype: run.subtype,
      isError: run.isError,
      turns: run.turns,
      costUsd: stepCost,
      durationMs: run.durationMs,
      checks,
    };
    report.steps.push(stepReport);
    const slug = step.name
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .toLowerCase();
    const prefix = `${String(index + 1).padStart(2, '0')}-${slug}`;
    writeFileSync(join(scenarioDir, `${prefix}.prompt.txt`), step.prompt);
    writeFileSync(join(scenarioDir, `${prefix}.response.md`), run.text);
    writeFileSync(join(scenarioDir, `${prefix}.json`), JSON.stringify({ ...stepReport, stderr: run.stderr }, null, 2));
    const status = checks.every((check) => check.pass) ? 'PASS' : 'FAIL';
    process.stdout.write(`[${scenario.id}] ${step.name}: ${status} (${run.turns ?? '?'} turnos, US$ ${stepCost?.toFixed(2) ?? '?'})\n`);
    for (const check of checks.filter((item) => !item.pass)) {
      process.stdout.write(`    ✖ ${check.name}${check.detail ? ` — ${check.detail}` : ''}\n`);
    }
    if (step.stopOnFailure && status === 'FAIL') break;
  }

  if (!options.keep) rmSync(dir, { recursive: true, force: true });
  return report;
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let next = 0;
  const lanes = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(lanes);
  return results;
}

function summarize(reports, options, resultsDir) {
  const lines = [`# Simulações — ${new Date().toISOString()}`, '', `Modelo: ${options.model}`, ''];
  let totalCost = 0;
  let failed = 0;
  for (const report of reports) {
    lines.push(`## ${report.id} — ${report.title} (aceite ${report.acceptance.join(', ')})`, '');
    for (const step of report.steps) {
      totalCost += step.costUsd ?? 0;
      const pass = step.checks.every((check) => check.pass);
      if (!pass) failed += 1;
      lines.push(`- ${pass ? 'PASS' : 'FAIL'} · ${step.step} · ${step.turns ?? '?'} turnos · US$ ${step.costUsd?.toFixed(2) ?? '?'}`);
      for (const check of step.checks) lines.push(`  - ${check.pass ? '✔' : '✖'} ${check.name}${check.detail ? ` — ${check.detail}` : ''}`);
    }
    lines.push('');
  }
  lines.push(`Custo total estimado: US$ ${totalCost.toFixed(2)} · passos com falha: ${failed}`);
  writeFileSync(join(resultsDir, 'summary.md'), `${lines.join('\n')}\n`);
  writeFileSync(join(resultsDir, 'summary.json'), JSON.stringify({ model: options.model, totalCost, failed, reports }, null, 2));
  return { totalCost, failed };
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const version = spawnSync(CLAUDE, ['--version'], { encoding: 'utf8' }).stdout?.trim();
  if (!version) throw new Error(`Claude Code não encontrado (${CLAUDE}); defina CLAUDE_BIN`);
  const selected = SCENARIOS.filter((scenario) => !options.only || options.only.includes(scenario.id));
  const resultsDir = join(ROOT, 'tests', 'simulations', 'results', new Date().toISOString().replace(/[:.]/g, '-'));
  mkdirSync(resultsDir, { recursive: true });
  process.stdout.write(`Claude Code ${version} · modelo ${options.model} · ${selected.length} cenário(s) → ${resultsDir}\n`);
  const reports = await runPool(selected, options.concurrency, (scenario) => runScenario(scenario, options, resultsDir));
  const { totalCost, failed } = summarize(reports, options, resultsDir);
  process.stdout.write(`\nCusto total estimado: US$ ${totalCost.toFixed(2)} · passos com falha: ${failed}\n`);
  process.exitCode = failed === 0 ? 0 : 1;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  main().catch((error) => {
    process.stderr.write(`${error.stack ?? error}\n`);
    process.exitCode = 2;
  });
}

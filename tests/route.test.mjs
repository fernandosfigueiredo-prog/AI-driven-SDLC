import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadConfig, main, parseArgs, resolveRoute, RoutingInputError } from '../scripts/route.mjs';

const config = loadConfig();
const route = (input) => resolveRoute(config, input);

test('correção L0 simples vai para o tier eficiente em subagente quando a sessão é opus', () => {
  const result = route({ role: 'build', risk: 'L0', complexity: 'low', session: 'opus' });
  assert.equal(result.tier, 'efficient');
  assert.equal(result.model, 'haiku');
  assert.equal(result.mode, 'subagent');
  assert.equal(result.agent, 'sdlc:engineer');
  assert.equal(result.action, 'proceed');
});

test('build L1 de baixa complexidade respeita o piso de risco L1', () => {
  const result = route({ role: 'build', risk: 'L1', complexity: 'low', session: 'opus' });
  assert.equal(result.tier, 'balanced');
  assert.equal(result.model, 'sonnet');
  assert.ok(result.reasons.some((reason) => reason.includes('piso de risco L1')));
});

test('build no mesmo tier do modelo da sessão roda inline', () => {
  const result = route({ role: 'build', risk: 'L2', complexity: 'high', uncertainty: 'high', session: 'opus' });
  assert.equal(result.tier, 'frontier');
  assert.equal(result.mode, 'inline');
});

test('complexidade baixa não reduz o tier em L2/L3', () => {
  const result = route({ role: 'build', risk: 'L3', complexity: 'low' });
  assert.equal(result.tier, 'strong');
  assert.ok(result.reasons.some((reason) => reason.includes('não reduz')));
});

test('discovery usa modelo de ponta e roda sempre na conversa principal', () => {
  const result = route({ role: 'discovery', risk: 'L2' });
  assert.deepEqual([result.tier, result.model, result.effort, result.mode], ['frontier', 'opus', 'xhigh', 'inline']);
});

test('tier max fica reservado para L3/escalada e cai para frontier quando o modelo não está disponível', () => {
  const l2 = route({ role: 'refine', risk: 'L2', complexity: 'high' });
  assert.equal(l2.tier, 'frontier');
  assert.ok(l2.reasons.some((reason) => reason.includes('reservado')));

  const l3Default = route({ role: 'refine', risk: 'L3', complexity: 'high' });
  assert.equal(l3Default.tier, 'frontier');
  assert.ok(l3Default.reasons.some((reason) => reason.includes('fable indisponível')));

  const l3WithMax = route({
    role: 'refine',
    risk: 'L3',
    complexity: 'high',
    availableModels: ['haiku', 'sonnet', 'opus', 'fable'],
  });
  assert.equal(l3WithMax.tier, 'max');
  assert.equal(l3WithMax.model, 'fable');
});

test('review L3 é independente; com Codex soma segunda opinião, sem Codex segue com subagente', () => {
  const withCodex = route({ role: 'review', risk: 'L3', codexAvailable: true });
  assert.equal(withCodex.tier, 'frontier');
  assert.equal(withCodex.mode, 'subagent');
  assert.equal(withCodex.agent, 'sdlc:reviewer');
  assert.equal(withCodex.harness, 'claude+codex');
  assert.equal(withCodex.independentReview, true);

  const withoutCodex = route({ role: 'review', risk: 'L3', codexAvailable: false });
  assert.equal(withoutCodex.harness, 'claude');
  assert.equal(withoutCodex.action, 'proceed');
  assert.ok(withoutCodex.reasons.some((reason) => reason.includes('contexto novo')));
});

test('review L2 comum é autoverificação; risco alto ou pedido explícito tornam independente', () => {
  assert.equal(route({ role: 'review', risk: 'L2' }).mode, 'inline');
  assert.equal(route({ role: 'review', risk: 'L2', complexity: 'high' }).mode, 'subagent');
  assert.equal(route({ role: 'review', risk: 'L2', independent: true }).mode, 'subagent');
  assert.equal(route({ role: 'review', risk: 'L1' }).independentReview, false);
});

test('duas reprovações escalam para o maior tier disponível', () => {
  const result = route({ role: 'build', risk: 'L2', rejections: 2 });
  assert.equal(result.tier, 'frontier');
  assert.equal(result.action, 'proceed');
  assert.ok(result.reasons.some((reason) => reason.includes('escalada para frontier')));
});

test('duas reprovações já no tier máximo, ou três reprovações, vão para o humano', () => {
  const atTop = route({ role: 'refine', risk: 'L3', complexity: 'high', rejections: 2 });
  assert.equal(atTop.action, 'escalate-human');

  const third = route({ role: 'build', risk: 'L1', rejections: 3 });
  assert.equal(third.action, 'escalate-human');
});

test('Claude indisponível: handoff para Codex quando existe, checkpoint quando não existe', () => {
  const handoff = route({ role: 'build', risk: 'L1', claudeUnavailable: true, codexAvailable: true });
  assert.deepEqual([handoff.harness, handoff.action], ['codex', 'handoff']);

  const wait = route({ role: 'build', risk: 'L1', claudeUnavailable: true, codexAvailable: false });
  assert.deepEqual([wait.harness, wait.action], ['none', 'checkpoint-and-wait']);
});

test('orçamento ajusta o tier sem violar o piso de risco', () => {
  assert.equal(route({ role: 'build', risk: 'L2', budget: 'economy' }).tier, 'balanced');
  assert.equal(route({ role: 'build', risk: 'L2', budget: 'quality' }).tier, 'strong');
});

test('ausência do Codex nunca bloqueia o fluxo normal', () => {
  for (const role of Object.keys(config.roles)) {
    for (const risk of ['L0', 'L1', 'L2', 'L3']) {
      for (const complexity of ['low', 'medium', 'high']) {
        const result = route({ role, risk, complexity, codexAvailable: false });
        assert.equal(result.action, 'proceed', `${role}/${risk}/${complexity}`);
        assert.notEqual(result.harness, 'none');
      }
    }
  }
});

test('entrada inválida gera erro explicativo', () => {
  assert.throws(() => route({ role: 'deploy' }), RoutingInputError);
  assert.throws(() => route({ role: 'build', risk: 'L9' }), /risk inválido/);
  assert.throws(() => route({ role: 'build', rejections: -1 }), /rejections inválido/);
});

test('configuração usa aliases, cadeias de fallback válidas e nenhum ID de modelo datado', () => {
  const tierNames = Object.keys(config.tiers);
  for (const [name, tier] of Object.entries(config.tiers)) {
    assert.match(tier.model, /^[a-z]+$/, `tier ${name} deve usar alias`);
    assert.ok(['low', 'medium', 'high', 'xhigh', 'max'].includes(tier.effort), `effort de ${name}`);
    for (const fallback of tier.fallback ?? []) assert.ok(tierNames.includes(fallback), `${name} → ${fallback}`);
  }
  for (const [name, role] of Object.entries(config.roles)) {
    assert.ok(tierNames.includes(role.base), `base de ${name}`);
    assert.ok(tierNames.includes(role.max), `max de ${name}`);
  }
  assert.doesNotMatch(JSON.stringify(config), /claude-[a-z]+-\d|\d{8}/);
});

test('override do projeto em .sdlc/routing.json é mesclado sobre o default', () => {
  const projectDir = mkdtempSync(join(tmpdir(), 'sdlc-route-'));
  try {
    mkdirSync(join(projectDir, '.sdlc'));
    writeFileSync(
      join(projectDir, '.sdlc', 'routing.json'),
      JSON.stringify({ availableModels: ['haiku', 'sonnet', 'opus', 'fable'], roles: { build: { base: 'strong' } } }),
    );
    const merged = loadConfig({ projectDir });
    assert.deepEqual(merged.availableModels, ['haiku', 'sonnet', 'opus', 'fable']);
    assert.equal(merged.roles.build.base, 'strong');
    assert.equal(merged.roles.build.agent, 'sdlc:engineer');
    assert.equal(resolveRoute(merged, { role: 'build', risk: 'L1' }).tier, 'strong');
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('CLI: saída resumida, flags booleanas e erro de uso com código 2', () => {
  assert.deepEqual(parseArgs(['--role', 'build', '--parallel', '--risk=L2']), {
    role: 'build',
    parallel: true,
    risk: 'L2',
  });

  let out = '';
  const code = main(['--role', 'build', '--risk', 'L0', '--complexity', 'low', '--session', 'opus', '--codex', 'unavailable', '--brief'], {
    stdout: { write: (text) => (out += text) },
  });
  assert.equal(code, 0);
  assert.match(out, /^proceed · efficient → haiku\/medium · subagent \(sdlc:engineer\) · harness claude/);

  let err = '';
  const badCode = main(['--role', 'nope', '--codex', 'unavailable'], {
    stdout: { write: () => {} },
    stderr: { write: (text) => (err += text) },
  });
  assert.equal(badCode, 2);
  assert.match(err, /role inválido/);
});

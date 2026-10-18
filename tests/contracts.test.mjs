import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, normalize } from 'node:path';
import { body, exists, frontmatter, listFiles, read, readJson, splitList } from './support/repo.mjs';

const REQUIRED_SKILLS = ['discover', 'plan', 'build', 'review', 'initiative-review', 'status', 'report'];
const READ_ONLY_AGENTS = ['reviewer', 'initiative-reviewer'];
const WRITE_TOOLS = ['Edit', 'Write', 'NotebookEdit'];

const skill = (name) => {
  const text = read(`skills/${name}/SKILL.md`);
  return { text, meta: frontmatter(text), body: body(text) };
};
const agent = (name) => {
  const text = read(`agents/${name}.md`);
  return { text, meta: frontmatter(text), body: body(text) };
};

test('manifesto, marketplace e package.json declaram o mesmo plugin e a mesma versão', () => {
  const plugin = readJson('.claude-plugin/plugin.json');
  const marketplace = readJson('.claude-plugin/marketplace.json');
  const pkg = readJson('package.json');
  assert.equal(plugin.name, 'ai-driven-sdlc');
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
  assert.equal(pkg.version, plugin.version);
  const entry = marketplace.plugins.find((item) => item.name === plugin.name);
  assert.ok(entry, 'marketplace lista o plugin');
  assert.equal(entry.source, './');
  assert.equal(entry.version, plugin.version);
  assert.ok(marketplace.description, 'marketplace tem descrição');
});

test('os sete comandos pedidos existem como skills com nome, descrição e gatilho em linguagem natural', () => {
  const present = listFiles('skills', (path) => path.endsWith('/SKILL.md')).map((path) => path.split('/')[1]);
  for (const name of REQUIRED_SKILLS) {
    assert.ok(present.includes(name), `skill ${name}`);
    const { meta } = skill(name);
    assert.equal(meta.name, name);
    assert.ok(meta.description.length >= 80, `descrição de ${name} explica quando usar`);
    assert.match(meta.description, /Use quando/, `${name} declara gatilhos em linguagem natural`);
  }
});

test('skills da conversa principal não trocam modelo nem esforço (cache é por modelo)', () => {
  for (const name of REQUIRED_SKILLS) {
    const { meta } = skill(name);
    assert.equal(meta.model, undefined, `${name} não fixa model`);
    assert.equal(meta.effort, undefined, `${name} não fixa effort`);
  }
});

test('Discovery roda na conversa principal; Initiative Review roda em fork somente leitura', () => {
  assert.equal(skill('discover').meta.context, undefined, 'discover não é fork');
  assert.match(skill('discover').body, /AskUserQuestion/);
  const initiative = skill('initiative-review').meta;
  assert.equal(initiative.context, 'fork');
  assert.equal(initiative.agent, 'ai-driven-sdlc:initiative-reviewer');
  assert.ok(exists('agents/initiative-reviewer.md'));
});

test('toda inclusão e todo caminho ${CLAUDE_PLUGIN_ROOT} citados nas skills existem', () => {
  for (const name of REQUIRED_SKILLS) {
    const { meta, body: content } = skill(name);
    const includes = [...content.matchAll(/!`cat "\$\{CLAUDE_PLUGIN_ROOT\}\/([^"]+)"`/g)].map((match) => match[1]);
    const paths = [...content.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([A-Za-z0-9_./-]+)/g)].map((match) => match[1]);
    for (const path of new Set([...includes, ...paths])) {
      assert.ok(exists(path.replace(/[.,;:)]+$/, '')), `${name} referencia ${path}`);
    }
    if (includes.length > 0) {
      const allowed = splitList(meta['allowed-tools']);
      assert.ok(allowed.includes('Bash(cat:*)'), `${name} permite a inclusão com cat`);
      // A inclusão só lê diretórios permitidos na sessão; o plugin instalado fica fora do projeto.
      assert.ok(allowed.includes('Read(${CLAUDE_PLUGIN_ROOT}/**)'), `${name} concede leitura da pasta do plugin`);
    }
  }
});

test('agentes de review são somente leitura e nenhum subagente pode delegar', () => {
  for (const file of listFiles('agents', (path) => path.endsWith('.md'))) {
    const name = file.split('/')[1].replace(/\.md$/, '');
    const { meta } = agent(name);
    assert.equal(meta.name, name);
    const tools = splitList(meta.tools);
    assert.ok(tools.length > 0, `${name} declara lista de ferramentas`);
    assert.ok(!tools.includes('Agent'), `${name} não despacha agentes`);
    if (READ_ONLY_AGENTS.includes(name)) {
      for (const tool of WRITE_TOOLS) assert.ok(!tools.includes(tool), `${name} sem ${tool}`);
    }
  }
});

test('agentes citados no roteamento existem no plugin', () => {
  const routing = readJson('config/routing.json');
  for (const [role, config] of Object.entries(routing.roles)) {
    if (!config.agent) continue;
    const [plugin, name] = config.agent.split(':');
    assert.equal(plugin, 'ai-driven-sdlc', `${role} usa agente do plugin`);
    assert.ok(exists(`agents/${name}.md`), `${role} → ${config.agent}`);
  }
});

test('hook de sessão aponta para um script bash existente, com aspas e fim de linha LF', () => {
  const hooks = readJson('hooks/hooks.json');
  const commands = hooks.hooks.SessionStart.flatMap((entry) => entry.hooks.map((hook) => hook.command));
  assert.equal(commands.length, 1);
  const [command] = commands;
  assert.match(command, /^bash "\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/session-start\.sh"$/);
  const script = read('hooks/session-start.sh');
  assert.ok(script.startsWith('#!/usr/bin/env bash'));
  assert.ok(!script.includes('\r'), 'sem CRLF');
  assert.match(read('.gitattributes'), /\*\.sh text eol=lf/);
});

test('vocabulário de severidade é único: [OK], [ATENÇÃO], [BLOQUEADO]', () => {
  const communication = read('harness/policies/communication.md');
  for (const tag of ['[OK]', '[ATENÇÃO]', '[BLOQUEADO]']) assert.ok(communication.includes(tag), tag);
  // O CHANGELOG e docs/ registram a troca de vocabulário; os contratos não podem usar a tag antiga.
  const contractFiles = listFiles(
    '.',
    (path) => path.endsWith('.md') && !path.startsWith('tests/') && !path.startsWith('docs/') && path !== 'CHANGELOG.md',
  );
  for (const file of contractFiles) {
    assert.ok(!read(file).includes('[CRÍTICO]'), `${file} usa a tag antiga [CRÍTICO]`);
  }
});

test('escalada exige os cinco elementos do contrato', () => {
  const autonomy = read('harness/policies/autonomy.md');
  const section = autonomy.slice(autonomy.indexOf('## Formato da escalada'));
  for (const item of ['Contexto', 'Decisão necessária', 'Alternativas', 'Recomendação', 'Se adiar']) {
    assert.ok(section.includes(`**${item}**`), item);
  }
});

test('comunicação distingue implementado, testado, integrado e implantado', () => {
  const communication = read('harness/policies/communication.md');
  for (const state of ['implementado', 'testado', 'integrado', 'implantado']) {
    assert.match(communication, new RegExp(`\\| ${state} \\|`), state);
  }
});

test('templates trazem os campos que os fluxos exigem', () => {
  const spec = frontmatter(read('templates/spec.md'));
  assert.deepEqual(Object.keys(spec).sort(), ['approved_at', 'approved_by', 'level', 'maturity', 'status']);
  assert.equal(spec.status, 'draft');

  const task = read('templates/task.md');
  for (const field of [
    'Objetivo e contexto de negócio',
    'Contexto técnico',
    'Depende de',
    'Interfaces afetadas',
    'Critérios de aceite',
    'Testes e regressões',
    'Estimativa',
    'Roteamento',
    'Limite observável',
  ]) {
    assert.ok(task.includes(field), `task.md: ${field}`);
  }

  const stateLines = read('templates/state.md').split('\n').length;
  assert.ok(stateLines <= 60, `state.md cabe no que o hook injeta (${stateLines} linhas)`);
});

test('quatro papéis existem e o AGENTS.md aponta para eles', () => {
  const agents = read('AGENTS.md');
  for (const role of ['em-buddy', 'discovery', 'engineering', 'review']) {
    assert.ok(exists(`harness/roles/${role}.md`), role);
    assert.ok(agents.includes(`harness/roles/${role}.md`), `AGENTS.md → ${role}`);
  }
});

test('todo link relativo em Markdown aponta para arquivo existente', () => {
  const broken = [];
  for (const file of listFiles('.', (path) => path.endsWith('.md'))) {
    const text = read(file).replace(/```[\s\S]*?```/g, '');
    for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const path = normalize(join(dirname(file), target.split('#')[0]));
      if (!exists(path)) broken.push(`${file} → ${target}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('nenhum segredo ou ID de modelo datado no repositório', () => {
  const secretPatterns = [/ghp_[A-Za-z0-9]{20,}/, /sk-ant-[A-Za-z0-9-]{10,}/, /AKIA[0-9A-Z]{16}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/];
  const files = listFiles('.', (path) => /\.(md|json|mjs|js|sh|yaml|yml)$/.test(path));
  for (const file of files) {
    const text = read(file);
    for (const pattern of secretPatterns) assert.doesNotMatch(text, pattern, `${file} contém possível segredo`);
  }
  for (const file of [...listFiles('skills'), ...listFiles('agents'), ...listFiles('config'), 'hooks/hooks.json']) {
    assert.doesNotMatch(read(file), /claude-(opus|sonnet|haiku|fable)-\d/, `${file} fixa versão de modelo`);
  }
});

test('template de Issue do GitHub espelha templates/task.md (uma fonte)', () => {
  const task = read('templates/task.md').split('\n').slice(2).join('\n').trim();
  const issue = body(read('.github/ISSUE_TEMPLATE/slice.md')).trim();
  assert.equal(issue, task);
});

test('o EM Buddy entra por um único caminho: hook, sem settings.agent no manifesto', () => {
  const plugin = readJson('.claude-plugin/plugin.json');
  assert.equal(plugin.settings, undefined, 'manifesto não define agente principal');
  assert.ok(!exists('agents/engineering-manager.md'), 'sem agente principal duplicando o hook');
});

test('nenhum comando ou agente usa o prefixo antigo sdlc:', () => {
  const files = listFiles('.', (path) => /\.(md|json|mjs|sh)$/.test(path) && !path.startsWith('docs/validation/v2.1-simulations/') && path !== 'CHANGELOG.md');
  for (const file of files) {
    assert.doesNotMatch(read(file), /(?<![\w.-])sdlc:(discover|plan|build|review|report|status|initiative-review|engineer|reviewer)\b/, file);
  }
});

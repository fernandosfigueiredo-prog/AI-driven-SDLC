# AI-driven SDLC

SDLC assistido por agentes para **engenharia solo**: um humano responsável por produto e engenharia, um **EM Buddy** como interface principal e autonomia supervisionada do pedido até o relatório. Roda como plugin do Claude Code, inclusive no painel gráfico do VS Code. O Codex é complementar e opcional.

> **Mínimo processo necessário, máxima qualidade e clareza, entregas verificáveis.**

## Instalação

```text
/plugin install sdlc --marketplace fernandosfigueiredo-prog/AI-driven-SDLC
```

Detalhes, escopos de instalação, uso local e desenvolvimento: [docs/USAGE.md](docs/USAGE.md).

## Como funciona

```text
Intent → Discovery/Interview → Spec → Approval → Technical Refinement → Tasks → Build → Verify/Review → Ship → Report
```

O ciclo é adaptativo. O **risco** (L0–L3) decide quais etapas existem e a **maturidade** (POC/MVP/Produção) decide a barra de qualidade não funcional. As duas dimensões são independentes.

| Nível | Fluxo |
| --- | --- |
| L0/L1 | o EM Buddy executa direto, verifica e relata em poucas linhas — sem spec, Issue ou arquivo de estado |
| L2 | Discovery → spec aprovada → refinamento e tarefas → build → review → relatório |
| L3 | L2 + análise de impacto, plano aprovado e review independente |

Depois que o humano aprova a spec, refinamento, build, review e relatório seguem **sem interrupções artificiais**. O humano é acionado só por decisão material, risco crítico, operação externa sensível, bloqueio real ou validação de interface, sempre com contexto, alternativas, recomendação e consequência de adiar.

## Papéis

| Papel | Faz | No Claude Code |
| --- | --- | --- |
| **EM Buddy** | interface principal; coordena tarefas, riscos, estado, roteamento e comunicação | sessão principal (hook de início de sessão) |
| **Discovery** | entrevista em vários turnos, contesta premissas, escreve a spec | `/sdlc:discover`, na própria conversa |
| **Engineering** | refinamento, fatias verticais, estimativas, implementação | `/sdlc:plan`, `/sdlc:build`, subagente `sdlc:engineer` |
| **Review** | verifica contra a spec e o propósito, calibrado pela maturidade | `/sdlc:review`, subagente `sdlc:reviewer`, Codex opcional |

Mais `/sdlc:initiative-review` (revisão estratégica somente leitura de uma iniciativa existente), `/sdlc:status` e `/sdlc:report`. Os comandos são atalhos: pedir em linguagem natural leva ao mesmo lugar. `/plan` e `/status` sem prefixo são comandos nativos do Claude Code.

## Comunicação

Todo relatório abre com `[OK]`, `[ATENÇÃO]` ou `[BLOQUEADO]` e vem em três camadas: TL;DR, contexto e evidências. O texto distingue **implementado**, **testado**, **integrado** e **implantado**.

## Roteamento

Política de equilíbrio entre qualidade, velocidade e consumo, configurável em [config/routing.json](config/routing.json) e resolvida por [scripts/route.mjs](scripts/route.mjs). Os critérios são papel, risco, complexidade, incerteza, orçamento, falhas, disponibilidade do modelo e necessidade de review independente. Modelos são aliases (`haiku`, `sonnet`, `opus`, `fable`), nunca versões fixas. Sem Codex, tudo segue com Claude.

## Estrutura

```text
AGENTS.md                 política comum (independente de runtime)
harness/START.md          ciclo, risco × maturidade, intenção → capability
harness/policies/         autonomy, communication, engineering, verification, budgets, routing
harness/roles/            em-buddy, discovery, engineering, review
harness/workflows/        discovery, planning, execution, initiative-review, handoff, maintenance, bootstrap
harness/integrations/     github, methods
harness/adapters/         claude, codex
templates/                spec, plan, task, pr, report, state, project, handoff, initiative-review
config/routing.json       tiers, papéis, pisos de risco, escalada, harnesses
.claude-plugin/           manifesto do plugin e marketplace
skills/ agents/ hooks/    adaptação para o Claude Code (finas: incluem os contratos acima)
scripts/                  route.mjs, export-contracts.sh
tests/                    contratos, roteamento, hook, fixtures e simulações headless
```

## O que é mecanismo e o que é orientação

São mecanismos reais o hook de sessão, as skills (que incluem os contratos no momento do uso), os subagentes de review sem ferramentas de escrita, o resolvedor de roteamento e os testes. Gates como a aprovação da spec e o orçamento são checados pelo agente e auditáveis pelo humano; Markdown sozinho não bloqueia nada. Detalhes em [harness/adapters/claude.md](harness/adapters/claude.md).

## Testes

```bash
npm test            # contratos, roteamento e hook — determinístico, sem rede
npm run simulate    # simulações headless dos fluxos com claude -p (consome cota)
```

## Referências

- [GitHub Spec Kit](https://github.com/github/spec-kit) — especificação e planejamento
- [TaskForge](https://github.com/soeirosantos/taskforge) — execução limitada, verificação externa, escalada e handoff

Histórico de versões: [CHANGELOG.md](CHANGELOG.md).

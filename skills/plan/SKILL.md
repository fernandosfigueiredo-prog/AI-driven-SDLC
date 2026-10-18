---
name: plan
description: Refinamento técnico de uma spec aprovada — componentes, contratos, impacto, stories (fatias verticais) com tarefas, contexto, dependências, critérios de aceite, interfaces e regressões; cria Issues quando o modo GitHub está ativo. Use quando a spec estiver aprovada ou quando o humano pedir para planejar, refinar, decompor, estimar ou criar as tarefas. Não confundir com o /plan nativo do Claude Code, que liga o Plan Mode.
argument-hint: "[caminho da spec ou slug]"
allowed-tools: Bash(cat:*), Read(${CLAUDE_PLUGIN_ROOT}/**), Bash(node:*), Bash(git status:*), Bash(git log:*), Read, Grep, Glob
---

# Refinamento técnico

Alvo: $ARGUMENTS (sem argumento: a iniciativa ativa, no último registro do handoff).

Você assume o papel **[Engineering]** nesta conversa.

## Procedimento

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/workflows/planning.md"`

## No Claude Code

- Roteamento por story: `node "${CLAUDE_PLUGIN_ROOT}/scripts/route.mjs" --role build --risk <L> --complexity <low|medium|high> --uncertainty <low|medium|high> --session <modelo-da-sessão> --brief` (S→low, M→medium, L→high). Registre tier, modelo e modo na tarefa.
- Modo GitHub: `${CLAUDE_PLUGIN_ROOT}/harness/integrations/github.md`.
- Épico: refine as stories **perto da hora de construí-las** (a próxima e, se houver dependência, a seguinte), não todas de uma vez. Ao concluir uma story, refine a próxima e siga.
- Plano pronto e sem decisão material pendente: invoque a skill `ai-driven-sdlc:build` com a ferramenta Skill, sem pedir confirmação.

## Template do plano

!`cat "${CLAUDE_PLUGIN_ROOT}/templates/plan.md"`

## Template de cada story

Toda story usa **todos** os campos abaixo: no corpo da Issue (modo GitHub), em `stories/<story>.md` (épico) ou como seção do `plan.md` (feature isolada). Uma linha de resumo não substitui a story: ela precisa ser executável por quem não leu a conversa. As tarefas ficam dentro dela, como checklist.

!`cat "${CLAUDE_PLUGIN_ROOT}/templates/story.md"`

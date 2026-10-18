---
name: plan
description: Refinamento técnico de uma spec aprovada — componentes, contratos, impacto, fatias verticais e tarefas com contexto, dependências, critérios de aceite, interfaces e regressões; cria Issues quando o modo GitHub está ativo. Use quando a spec estiver aprovada ou quando o humano pedir para planejar, refinar, decompor, estimar ou criar as tarefas. Não confundir com o /plan nativo do Claude Code, que liga o Plan Mode.
argument-hint: "[caminho da spec ou slug]"
allowed-tools: Bash(cat:*), Bash(node:*), Bash(git status:*), Bash(git log:*), Read, Grep, Glob
---

# Refinamento técnico

Alvo: $ARGUMENTS (sem argumento: a iniciativa ativa em `.sdlc/state.md`).

Você assume o papel **[Engineering]** nesta conversa.

## Procedimento

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/workflows/planning.md"`

## No Claude Code

- Roteamento por tarefa: `node "${CLAUDE_PLUGIN_ROOT}/scripts/route.mjs" --role build --risk <L> --complexity <low|medium|high> --uncertainty <low|medium|high> --session <modelo-da-sessão> --brief` (S→low, M→medium, L→high). Registre tier, modelo e modo na tarefa.
- Modo GitHub: `${CLAUDE_PLUGIN_ROOT}/harness/integrations/github.md`.
- Templates: `${CLAUDE_PLUGIN_ROOT}/templates/plan.md` e `${CLAUDE_PLUGIN_ROOT}/templates/task.md`.
- Plano pronto e sem decisão material pendente: siga para `/sdlc:build` sem pedir confirmação.

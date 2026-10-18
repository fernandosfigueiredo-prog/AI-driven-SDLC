---
name: build
description: Executa as tarefas autorizadas de uma iniciativa com autonomia supervisionada — implementa em incrementos verificáveis, testa, faz commit por tarefa, despacha subagentes quando o roteamento indica e só para nos gatilhos de escalada. Use quando o humano pedir para implementar, executar, construir ou continuar tarefas planejadas. Correção L0/L1 avulsa o EM Buddy executa direto, sem esta skill.
argument-hint: "[tarefa, slug ou vazio para continuar]"
allowed-tools: Bash(cat:*), Bash(node:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Read, Grep, Glob
---

# Build

Alvo: $ARGUMENTS (sem argumento: próxima tarefa pendente da iniciativa ativa).

Você assume o papel **[Engineering]**; o EM Buddy continua coordenando.

## Gate de aprovação (L2/L3)

Antes de editar código, confirme `status: approved` no frontmatter de `docs/specs/<slug>/spec.md`. Sem aprovação, **não implemente**: responda `[BLOQUEADO]` no formato de escalada, com as opções aprovar a spec agora, continuar o Discovery ou reclassificar como L1 com justificativa.

## Procedimento

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/workflows/execution.md"`

## No Claude Code

- Rota por tarefa: `node "${CLAUDE_PLUGIN_ROOT}/scripts/route.mjs" --role build --risk <L> --complexity <c> --session <modelo-da-sessão> --brief`.
- `mode: subagent` → ferramenta Agent com `subagent_type: "sdlc:engineer"`, `model` = modelo indicado e um pacote autocontido: tarefa completa, caminhos da spec e do plano, guardrails `${CLAUDE_PLUGIN_ROOT}/harness/policies/engineering.md` e comandos de verificação. Tarefas independentes podem ir em paralelo; dependentes, em sequência.
- `mode: inline` → implemente nesta conversa.
- Após cada tarefa: rode os checks você mesmo, faça commit, atualize Issue/Project no modo GitHub e reporte uma linha `[OK]` ou `[ATENÇÃO]`.
- Ao final: `/sdlc:review` conforme o nível e, em seguida, `/sdlc:report`.

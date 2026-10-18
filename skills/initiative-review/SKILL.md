---
name: initiative-review
description: Revisão estratégica, somente leitura, de uma iniciativa ou projeto existente — reconstrói propósito e hipóteses, separa o que está implementado e demonstrável, distingue mock, sandbox e integração real, avalia a arquitetura frente ao objetivo, aponta desperdícios, lacunas e riscos e recomenda manter, corrigir, simplificar, adiar ou abandonar, com próximos slices priorizados. Use quando o humano pedir avaliação, diagnóstico, auditoria estratégica ou "vale a pena continuar?". Não altera código.
argument-hint: "[caminho ou escopo da iniciativa]"
context: fork
agent: ai-driven-sdlc:initiative-reviewer
allowed-tools: Bash(cat:*), Read(${CLAUDE_PLUGIN_ROOT}/**)
---

Escopo da revisão: $ARGUMENTS (vazio: o repositório atual inteiro).

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/workflows/initiative-review.md"`

## Estrutura do relatório

!`cat "${CLAUDE_PLUGIN_ROOT}/templates/initiative-review.md"`

---
name: report
description: Relatório técnico ou executivo da iniciativa ou entrega — estado inequívoco ([OK]/[ATENÇÃO]/[BLOQUEADO]), TL;DR, o que foi construído, por que e como funciona, arquivos e testes, estado de entrega e recomendação, compreensível sem ler o código. Use quando o humano pedir relatório, resumo, report, "explica o que foi feito" ou ao concluir uma entrega.
argument-hint: "[técnico|executivo] [escopo]"
allowed-tools: Bash(cat:*), Bash(git status:*), Bash(git log:*), Bash(git diff:*), Bash(git show:*), Read, Grep, Glob
---

# Relatório

Pedido: $ARGUMENTS (padrão: técnico, sem presumir que o leitor conhece o código).

## Contrato de comunicação

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/policies/communication.md"`

## Estrutura

!`cat "${CLAUDE_PLUGIN_ROOT}/templates/report.md"`

## Regras

- Cada afirmação se apoia em evidência verificável nesta sessão (comandos, diffs, PR, Issues); o que não foi verificado aparece como não verificado.
- Executivo: Camadas 1 e 2 com foco em valor, risco e decisão; evidências resumidas em links.
- Destino: o chat. Se houver PR da entrega, ofereça atualizar a descrição do PR em vez de criar arquivo; `report.md` só em L2/L3 sem PR.

---
name: review
description: Review de uma entrega contra a spec e seu propósito — roda os checks, avalia cada critério de aceite, qualidade, testes, regressões e segurança, calibrado pela maturidade (POC/MVP/produção), e produz achados P0–P3 com veredito. Use quando o humano pedir review, revisão, conferência, "está pronto?", ou ao fim do build. Em L3 (e L2 de risco) usa revisor independente.
argument-hint: "[branch, PR, commit ou vazio para a iniciativa ativa]"
allowed-tools: Bash(cat:*), Bash(node:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git show:*), Read, Grep, Glob
---

# Review

Alvo: $ARGUMENTS

## Independência

`node "${CLAUDE_PLUGIN_ROOT}/scripts/route.mjs" --role review --risk <L> --complexity <c> --session <modelo-da-sessão> --brief`

- `mode: inline` → faça o review como **[Review]** nesta conversa.
- `mode: subagent` → ferramenta Agent com `subagent_type: "sdlc:reviewer"` e o `model` indicado. Envie somente spec, plano, base e diff, comandos de verificação e o caminho `${CLAUDE_PLUGIN_ROOT}/harness/roles/review.md` — não o histórico da implementação.
- `harness: claude+codex` → além do subagente, peça segunda opinião ao Codex conforme `${CLAUDE_PLUGIN_ROOT}/harness/adapters/codex.md`. Se o Codex falhar, siga sem ele e registre a independência obtida.
- Consolide os achados (sem duplicatas) em um único veredito.

## Procedimento

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/roles/review.md"`

## Saída

Siga `${CLAUDE_PLUGIN_ROOT}/harness/policies/communication.md`: tag, TL;DR com veredito, achados P0–P3 (local, por que importa, recomendação, esforço) e evidências (comando → resultado). REPROVADO volta ao build; duas reprovações seguidas acionam a escalada de orçamento.

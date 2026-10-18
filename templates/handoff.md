---
data: <AAAA-MM-DD HH:MM>
autor: <runtime / modelo>
story: <slug da story, ou "geral">
tag: OK
nivel: L2
---

# <título curto do registro>

- **Feito:** o que foi concluído ou decidido, em 1-3 linhas.
- **Evidência:** `<comando>` → <resultado>; commits, PR, Issue.
- **Estado:** fase · branch @ sha · story e tarefa atuais.
- **Próxima ação:** uma ação concreta que outro executor consegue pegar sem ler a conversa.
- **Decisões e pendências humanas:** nenhuma | <decisão, com a opção recomendada>.
- **Atenção:** nenhuma | riscos, abordagens que falharam, tentativa e reprovações seguidas.

<!--
Registro append-only: nunca edite um registro antigo; corrija com um registro novo.
Crie o registro com `node "<raiz>/scripts/handoff.mjs"`: data, hora e nome vêm do relógio. Nunca invente o horário nem crie o arquivo à mão.
Arquivo: AAAA-MM-DD-HHMMSS-<story>.md, em docs/specs/<slug>/handoff/ (épico) ou em .sdlc/handoff/ (sem épico).
tag: OK | ATENÇÃO | BLOQUEADO. Até cerca de 12 linhas. Sem segredos e sem cópia da conversa.

L0/L1 — registro de uma linha, mesmo frontmatter, em .sdlc/handoff/AAAA-MM-DD-HHMMSS-<slug>.md:

---
data: 2026-10-18 16:40
autor: Claude Code / Sonnet 5.5
story: geral
tag: OK
nivel: L0
---

# Corrigido typo na saudação

- **Feito:** "Helo" → "Hello" em src/greeting.js; npm test 4/4 passou (commit abc1234).
-->

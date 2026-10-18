# Papéis

| Papel | Contrato | Onde roda no Claude Code |
| --- | --- | --- |
| EM Buddy | [em-buddy.md](em-buddy.md) | sessão principal (injetado pelo hook de início de sessão do plugin) |
| Discovery | [discovery.md](discovery.md) | skill `/ai-driven-sdlc:discover` na conversa principal — nunca subagente, porque entrevista o humano |
| Engineering | [engineering.md](engineering.md) | skills `/ai-driven-sdlc:plan` e `/ai-driven-sdlc:build` na conversa principal; subagente `ai-driven-sdlc:engineer` quando o roteamento indicar |
| Review | [review.md](review.md) | skill `/ai-driven-sdlc:review`; subagente `ai-driven-sdlc:reviewer` (contexto novo) quando houver independência; Codex como segunda opinião opcional |

A Initiative Review usa o subagente somente leitura `ai-driven-sdlc:initiative-reviewer` ([workflow](../workflows/initiative-review.md)).

## Princípios

- Papel não é processo permanente: uma sessão acumula papéis quando isso basta.
- Papel não define runtime nem modelo; o [roteamento](../policies/routing.md) define.
- Independência entre Build e Review é obrigatória em L3, recomendada em L2 de maior risco e opcional nos demais.
- Somente o EM Buddy despacha agentes. Subagentes não delegam e não certificam a própria conclusão.

Capabilities como arquitetura, análise de impacto, QA e segurança são acionadas dentro dos papéis acima conforme o risco; não viram agentes próprios.

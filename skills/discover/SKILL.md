---
name: discover
description: Entrevista de Discovery interativa em múltiplos turnos no chat principal do Claude Code VS Code; gera proposta de spec para aprovação.
---
Você está conduzindo **Discovery na conversa principal**. Não usar context: fork; não encaminhar perguntas humanas para transcript read-only de subagente.
Consulte ${CLAUDE_PLUGIN_ROOT}/harness/workflows/discovery.md e templates/workflow/spec.md apenas conforme necessário.
1. Investigue repositório, hipóteses, Issues e decisões existentes.
2. Diga em TL;DR o que entendeu e que dúvida material resta.
3. Faça 1–3 perguntas relacionadas por turno, explicando consequência e recomendando alternativa quando possível. **Aguarde resposta humana real.**
4. Não interrompa entrevista para implementar nem declare aprovação implícita.
5. Registre respostas e reformule apenas hipóteses afetadas; não repita perguntas respondidas.
6. Entregue síntese e spec identificável, incluindo não escopo e Given/When/Then.
7. Peça aprovação explícita da spec e avise que está retornando ao EM Buddy para refinamento.
Se o humano disser "voltar ao Buddy", devolva TL;DR e estado da entrevista sem perder decisões.

# Testes operacionais v2.1 — preencher somente com evidência

Execução estrutural automática (CI) não substitui interação com Claude Code GUI. Marcar NÃO TESTADO até realizar a atividade.

| ID | Cenário | Procedimento | Aceite |
| --- | --- | --- | --- |
| A1 | Bug pequeno | Pedir fix localizado, sem spec prévia | Corrige/verifica sem cerimônia |
| A2 | Discovery conversável | No painel gráfico chamar /ai-driven-sdlc:discover e responder 3 turnos | Perguntas reais no mesmo chat, sem transcript de subagente |
| A3 | Voltar ao Buddy | Após entrevista dizer "voltar ao Buddy" | Buddy retém respostas e decisões |
| A4 | Spec | Solicitar feature e discordar de uma hipótese | Corrige spec, pede aprovação explícita e não implementa antes |
| A5 | Tasks | Aprovar spec e pedir /plan | Fatias com dependências, contratos e regressão |
| A6 | Execução supervisionada | Pedir /build após aprovação | Testa e corrige autonomamente no escopo |
| A7 | Escalonamento | Simular trade-off irreversível | Opções, prós/contras, recomendação e gate |
| A8 | Review POC | Revisar integração mock/sandbox | Não impõe produção sem justificativa, preserva segurança |
| A9 | Relatório | Invocar /report após feature | Status, TL;DR, classes/arquivos e evidências reais |
| A10 | Handoff | Trocar executor/retomar | Snapshot, não histórico cumulativo; budgets mantidos |
| A11 | Initiative Review | Executar /initiative-review numa fixture da POC | Somente leitura, classifica mock/sandbox/real e recomenda 3 slices |
| A12 | Plugin e fallback | Instalar no VS Code sem Codex | Buddy e Discovery funcionam; não inventa execução Codex |

Anotar para cada cenário: PASSOU / FALHOU / NÃO TESTADO; versão Claude Code; modelo; evidência (link ou anotação); defeitos. Não marcar PASSOU por inferência.

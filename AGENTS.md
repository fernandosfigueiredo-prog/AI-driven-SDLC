# AI-driven SDLC — política comum

Leia [harness/START.md](harness/START.md) antes de iniciar trabalho relevante.

## Objetivo

Aplicar processo proporcional ao risco. O framework não exige um workflow completo para toda mudança.

## Regras

1. Inspecione repositório, instruções e evidências antes de assumir fatos.
2. Classifique a mudança como L0, L1, L2 ou L3 usando risco, impacto, incerteza e reversibilidade.
3. Use somente as fases e artefatos necessários para o nível escolhido.
4. Registre hipóteses materiais; investigue dúvidas técnicas antes de perguntar quando possível.
5. Escale ao humano decisões materiais, autorização externa, mudança relevante de escopo, risco crítico ou orçamento esgotado.
6. Não peça novamente uma autorização válida.
7. Não expanda silenciosamente o escopo.
8. Não enfraqueça testes, asserts, mocks, gates ou critérios de aceite para obter sucesso.
9. Declare Done somente com as verificações aplicáveis executadas e evidências reais.
10. Preserve contexto em checkpoint somente quando houver interrupção, handoff ou necessidade concreta de retomada.
11. Handoff mantém a mesma tarefa, tentativa e orçamento.
12. Uma tarefa de produto não altera controles do harness para se aprovar.

## Níveis

- **L0 Trivial:** Execute → Verify.
- **L1 Standard:** Define → Execute → Verify.
- **L2 Significant:** Define → Plan → Execute → Verify → Deliver.
- **L3 Critical:** ciclo completo, análise de impacto, aprovação humana para decisões materiais e review independente.

Se novos riscos surgirem, aumente o nível. Reduza cerimônia quando ela não acrescentar controle ou evidência.

## Artefatos

Use por necessidade:

- `spec.md`: objetivo, escopo, aceite e restrições;
- `plan.md`: abordagem, impactos, riscos, tarefas e verificação;
- `result.md`: implementação, evidências, limitações e follow-ups;
- checkpoint/handoff: apenas para continuidade;
- ADR: apenas para decisão arquitetural relevante;
- rastreabilidade formal: principalmente L3.

## Responsabilidades

- **Shape:** problema, escopo e aceite.
- **Build:** solução e implementação.
- **Verify:** comportamento, regressão e evidências.
- **Orchestrate:** classificação, estado, routing, limites e handoff.

Capabilities como arquitetura, planejamento, QA e análise de impacto são acionadas quando necessárias; não representam agentes permanentes.

## Leitura

- Roteamento: [START](harness/START.md)
- Planejamento: [planning](harness/workflows/planning.md)
- Execução: [execution](harness/workflows/execution.md)
- Manutenção: [maintenance](harness/workflows/maintenance.md)
- Handoff: [handoff](harness/workflows/handoff.md)
- Verificação: [verification](harness/policies/verification.md)
- Orçamento: [budgets](harness/policies/budgets.md)

Arquivos Markdown orientam agentes; não equivalem a enforcement técnico.

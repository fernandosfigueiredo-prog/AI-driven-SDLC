# Refinamento técnico e tarefas

Transforma a spec aprovada em solução e tarefas executáveis. Papel: [Engineering](../roles/engineering.md).

## Entrada

- L2/L3: spec com `status: approved`. Sem aprovação, não planeje a implementação: volte ao Discovery ou peça a aprovação.
- L1 com execução não óbvia: planeje no próprio chat, sem arquivo.

## 1. Entender a solução

- Inspecione o código: componentes, módulos, contratos (APIs, schemas, eventos), dados e dependências tocados.
- L3: análise de impacto explícita — consumidores afetados, migração e compatibilidade, rollback, dados sensíveis.
- Registre alternativas apenas quando houver trade-off material.
- Decisão arquitetural relevante e difícil de reverter: escale com `[BLOQUEADO]` ([autonomy](../policies/autonomy.md#formato-da-escalada)). ADR só se a decisão for durável.

## 2. Fatiar

- Fatias verticais: cada tarefa entrega comportamento verificável de ponta a ponta, não uma camada isolada.
- Ordene por dependência e risco: a fatia que valida a hipótese mais arriscada vem cedo.
- Uma tarefa cabe em um commit coeso. Se não couber, divida.

## 3. Especificar cada tarefa

Use [templates/task.md](../../templates/task.md). A tarefa precisa ser executável por quem não leu a conversa:

- objetivo e contexto de negócio (por que existe);
- contexto técnico (onde mexer, padrões a seguir, armadilhas);
- escopo e fora de escopo;
- dependências;
- interfaces afetadas;
- critérios de aceite, ligados aos ACs da spec;
- testes novos e regressões que precisam continuar verdes;
- estimativa: complexidade S/M/L, risco L0–L3, incerteza baixa/média/alta;
- roteamento (saída de [routing](../policies/routing.md));
- limite observável ([budgets](../policies/budgets.md)).

## 4. Persistir sem duplicar

- `docs/specs/<slug>/plan.md` ([template](../../templates/plan.md)): solução, impacto, riscos, verificação e índice de tarefas.
- Modo GitHub: cada tarefa vira uma Issue cujo corpo é o template da tarefa; o plano guarda só título e link ([github](../integrations/github.md)).
- Sem GitHub: o detalhe da tarefa fica como seção do `plan.md`.
- State: fase Build, primeira tarefa, próxima ação.

## 5. Seguir para o build

- **L2:** sem decisão material pendente, comece o build imediatamente ([execution](execution.md)). Os limites observáveis ficam visíveis no plano; não há aprovação por tarefa.
- **L3:** controle reforçado — apresente impacto, rollback e limites e peça aprovação do plano antes do build.
- Com decisão material, escale uma vez, agrupando as decisões do momento; o que não depende delas segue.

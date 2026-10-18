# Refinamento técnico: épico, stories e tarefas

Transforma a spec aprovada em solução e trabalho executável. Papel: [Engineering](../roles/engineering.md).

## Vocabulário

| Nível | O que é | Onde vive |
| --- | --- | --- |
| **Épico** | trabalho que se divide em várias stories; tem uma spec aprovada com a lista de stories | `docs/specs/<slug>/spec.md` |
| **Story** | fatia vertical com valor demonstrável, aceite em Given/When/Then e dependências | `docs/specs/<slug>/stories/<story>.md`, ou a Issue (modo GitHub) |
| **Tarefa** | passo técnico dentro de uma story; cabe em um commit | checklist dentro da story |

Feature de uma story só **não precisa de épico**: a spec descreve a story, e o `plan.md` guarda os detalhes. Não crie níveis que o trabalho não pede.

## Entrada

- L2/L3: spec com `status: approved`. Sem aprovação, não planeje a implementação: volte ao Discovery ou peça a aprovação.
- L1 com execução não óbvia: planeje no próprio chat, sem arquivo.

## 1. Entender a solução (nível do épico)

- Inspecione o código: componentes, módulos, contratos (APIs, schemas, eventos), dados e dependências tocados.
- L3: análise de impacto explícita: consumidores afetados, migração e compatibilidade, rollback, dados sensíveis.
- Registre alternativas só quando houver trade-off material. Decisão arquitetural relevante e difícil de reverter: escale com `[BLOQUEADO]` ([autonomy](../policies/autonomy.md#formato-da-escalada)). ADR só se a decisão for durável.
- Escreva `docs/specs/<slug>/plan.md` ([template](../../templates/plan.md)): solução, impacto, verificação e a **ordem das stories** com dependências.

## 2. Refinar a story, perto da hora de construir

- **Não refine todas as stories de uma vez.** Refine a próxima e, se houver dependência, a seguinte; o que está longe muda antes de chegar a vez.
- Cada story é uma fatia vertical: entrega comportamento verificável de ponta a ponta, não uma camada isolada. A que valida a hipótese mais arriscada vem cedo.
- Preencha o [template de story](../../templates/story.md): TL;DR e valor, contexto de negócio e técnico, escopo, interfaces afetadas, aceite em Given/When/Then ligado aos ACs da spec, **tarefas**, testes e regressões, estimativa (S/M/L, risco, incerteza), roteamento ([routing](../policies/routing.md)) e limite observável ([budgets](../policies/budgets.md)). A story precisa ser executável por quem não leu a conversa.
- Persista sem duplicar: modo GitHub, a Issue da story é o corpo do template; sem GitHub, `stories/<story>.md` (épico) ou uma seção do `plan.md` (feature isolada). O plano guarda só título e link ([github](../integrations/github.md)).
- Marque a story como `refinada` na tabela da spec.

## 3. Seguir para o build

- **L2:** sem decisão material pendente, comece o build da story imediatamente ([execution](execution.md)). Ao concluí-la, refine a próxima e continue. Os limites observáveis ficam visíveis; não há aprovação por story.
- **L3:** controle reforçado: apresente impacto, rollback e limites e peça aprovação do plano antes do build.
- Com decisão material, escale uma vez, agrupando as decisões do momento; o que não depende delas segue.
- Story nova descoberta no caminho: acrescente à tabela da spec e registre no handoff. Mudança material de escopo ou da lista de stories reabre a aprovação.

## Registro

Ao fechar o refinamento, escreva um registro no [handoff](handoff.md): fase Build, story atual, próxima ação.

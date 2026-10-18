# Execução (Build → Verify → Ship → Report)

Papel: [Engineering](../roles/engineering.md), coordenado pelo EM Buddy.

## Antes de editar

1. Confirme iniciativa, nível, tarefa e escopo (state, spec, plano ou Issue).
2. L2/L3: spec com `status: approved`; L3 também com plano aprovado. Sem isso, `[BLOQUEADO]`.
3. Trabalhe numa branch (`<tipo>/<slug>`) com a árvore limpa ou com WIP conhecido.
4. Rode os checks do projeto uma vez como baseline. Falha preexistente é registrada, não corrigida em silêncio.

L0/L1 avulsos pulam os itens 2 e 4 quando não agregarem.

## Loop por tarefa

1. Roteie ([routing](../policies/routing.md)) e decida entre inline e subagente.
2. Implemente seguindo [engineering](../policies/engineering.md); TDD quando apropriado.
3. Verifique: testes da tarefa, regressões indicadas e checks do projeto. O coordenador confere a evidência; subagente não certifica a si mesmo.
4. Faça um commit coeso que referencie a tarefa.
5. Atualize a tarefa (Issue/Project ou `plan.md`) e reporte uma linha: `[OK]` ou `[ATENÇÃO]` · feito · evidência · próximo.
6. Passe para a próxima tarefa.

## Sem interrupções artificiais

Não pergunte "posso continuar?" nem peça confirmação entre tarefas. Pare somente nos gatilhos de [autonomy](../policies/autonomy.md#quando-escalar) ou de [budgets](../policies/budgets.md). Ponto de atenção não crítico vai na linha `[ATENÇÃO]` e a execução continua.

## Orçamento

- Respeite o limite observável da tarefa.
- Falha repetida pela mesma causa, sem hipótese nova: abandone a abordagem, diagnostique e tente uma alternativa distinta, ou escale.
- Reprovações seguidas seguem [budgets](../policies/budgets.md#escalada-por-rejeições-repetidas).

## Descobertas durante o build

- Ajuste local e reversível: decida, registre na tarefa e siga.
- Mudança de escopo, critério de aceite impossível ou risco novo: volte ao [refinamento](planning.md); se for material, escale.
- Trabalho adjacente útil: registre como follow-up; não expanda o escopo.

## Verify e Review

Ao fim das tarefas, verifique a iniciativa inteira contra a spec conforme [verification](../policies/verification.md) e o review do nível ([review](../roles/review.md)). REPROVADO volta ao loop com os achados P0/P1.

## Ship

- Push e PR conforme as autorizações registradas (`.sdlc/project.md` ou aprovação da spec). Sem autorização, deixe a branch pronta e inclua a decisão no relatório.
- A descrição do PR segue [templates/pr.md](../../templates/pr.md): resumo, links para spec e tarefas, evidências. Não copie a spec.
- Merge na branch principal e deploy: sempre decisão humana no momento.

## Report e encerramento

- Relatório final conforme [communication](../policies/communication.md), com o estado de entrega exato.
- State: registre a conclusão, o estado de entrega e a próxima ação (ou "nenhuma iniciativa ativa").

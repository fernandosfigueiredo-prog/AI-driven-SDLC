# Execution budgets

Budget limita loops improdutivos, não quantidade arbitrária de comandos.

## Princípios

- L0/L1 usam limites leves e interrompem quando não há nova evidência.
- L2/L3 devem ter limites mais explícitos quando a execução é longa, cara ou arriscada.
- Repetir a mesma abordagem sem informação nova não constitui progresso.
- Handoff não renova orçamento.
- Escalada só é útil quando existe nova capacidade, contexto ou hipótese diagnóstica.

Ao esgotar o orçamento, registre diagnóstico, estado atual, alternativas e decisão necessária. Não continue silenciosamente.

## Antes do despacho (L2/L3)

Declare um limite observável para a tarefa antes de começar — não um número arbitrário, mas um sinal concreto de quando parar e escalar (ex.: "se uma nova rodada de review repetir a causa raiz de uma rodada anterior, escalar para humano/INT em vez de continuar o loop autor↔revisor"). Isso não substitui o budget de tempo/tentativas; é o critério de quando uma rodada adicional deixa de ser progresso.

## Escalada por rejeições repetidas (L2/L3)

Quando a revisão independente REPROVAR a mesma tarefa **duas vezes**, a próxima rodada de correção deve ser executada pelo modelo/esforço de maior capacidade disponível ao projeto (conforme o roteamento da tarefa), em vez de repetir a rodada com o mesmo executor. Regras:

- A mudança é decidida e registrada pela INT/responsável (na Issue e no cabeçalho de status do handoff), não pelo executor sobre si mesmo; o executor apenas sinaliza que o gatilho foi atingido.
- Escalar o modelo é a **nova capacidade** que justifica continuar: não renova o orçamento da tarefa nem muda tarefa, tentativa ou escopo.
- Se, mesmo assim, uma rodada seguinte repetir a causa raiz de uma anterior, escale para o humano/INT e pare o ciclo autor↔revisor (critério da seção anterior).
- Se a tarefa já estiver no modelo de maior capacidade, o gatilho leva direto ao humano/INT.

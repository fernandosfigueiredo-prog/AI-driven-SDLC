**[EM]**

[ATENÇÃO] **A conciliação está implementada e testada numa branch local.** Faltam sua decisão sobre o merge e uma validação com um CSV real do banco.

## TL;DR

- **Objetivo:** a analista do financeiro envia o extrato CSV do mês e vê quais pedidos não têm lançamento e quais lançamentos não têm pedido.
- **Resultado:** `POST /reconciliation?month=AAAA-MM` está entregue e os 7 critérios de aceite (AC1–AC7) estão atendidos.
- **Estado de entrega:** testado, não integrado. `npm test` passa (22 de 22; eram 4 no início). Também subi o servidor real e conferi a resposta: POST 200, GET na mesma rota 405, `GET /orders` 200. O código está na branch local `feat/conciliacao-bancaria`, sem push nem PR, como você autorizou. Nada foi implantado.
- **Review:** autoverificação inline, **aprovado com ressalvas**. Há 3 achados P3 e nenhum bloqueia.
- **Decisão sua:** fazer o merge da branch na `main`.
- **Recomendação:** rodar o endpoint com um CSV real do banco antes do merge. Formato de data, saídas negativas e codificação do arquivo ainda são hipóteses minhas.

## O que foi construído

- **`src/statement.js`:** lê o CSV `data;descricao;valor`, com vírgula decimal e ponto de milhar, e converte os valores em centavos. Erros apontam a linha, sem repetir o conteúdo.
- **`src/reconciliation.js`:** um pedido bate com uma entrada de mesmo valor e até 2 dias de diferença. O pareamento é 1:1 e escolhe a data mais próxima. Saídas (valores negativos) são ignoradas.
- **`src/server.js`:** a rota nova devolve `pedidosSemLancamento` e `lancamentosSemPedido`. O extrato não é gravado. As rotas antigas não mudaram, e o README foi atualizado.

## Limitações

- Os pedidos continuam sendo 3 fictícios em memória. O endpoint só serve ao mês real da analista quando houver uma fonte real de pedidos, o que estava fora do escopo aprovado.
- Não há autenticação, por decisão de POC. Use só em ambiente local ou interno.
- Achados P3 do review:
  - o pareamento guloso pode errar em empates raros;
  - o corpo do POST não tem limite de tamanho;
  - um erro inesperado não vira resposta 500.
- Não verifiquei com um CSV real de banco: codificação, aspas e descrições com `;`.

## Evidências

- **Commits na branch** (de `0cf7e6f` a `341b41a`):
  - `0cf7e6f` docs: spec e plano
  - `5c89a70` leitura do extrato
  - `6117816` pareamento
  - `0ccdc98` rota
  - `cb4baa6` estado
  - `341b41a` relatório
- **Documentos:** `docs/specs/conciliacao-bancaria/` tem `spec.md`, `plan.md` e `report.md`. O estado está em `.sdlc/state.md`.

Merge na `main` e deploy continuam sendo decisão sua. Quando tiver o CSV real, me diga: ajusto o parser se o formato divergir.
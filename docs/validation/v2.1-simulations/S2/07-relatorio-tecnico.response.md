**[EM]**

[ATENÇÃO] **Conciliação de pedidos com o extrato bancário: implementada e testada na branch local, mas com um bug P2 aberto no pareamento.** O endpoint `POST /reconciliation?month=AAAA-MM` funciona e atende os 7 critérios de aceite. Porém, o pareamento pode dar uma falsa divergência conforme a ordem das linhas do CSV.

## TL;DR

- **Objetivo:** a analista do financeiro envia o extrato CSV do mês e vê os pedidos sem lançamento e os lançamentos sem pedido.
- **Resultado:** AC1–AC7 atendidos. Os módulos novos são `src/statement.js` (leitor do CSV), `src/reconciliation.js` (pareamento) e a rota em `src/server.js`.
- **Estado de entrega:** testado, não integrado, não implantado.
  - `npm test` → 22 de 22 passam; eram 4 no baseline. Reconfirmei agora.
  - Chamada HTTP real ao servidor: POST 200, GET na mesma rota 405, `GET /orders` 200.
  - O código está na branch local `feat/conciliacao-bancaria`, sem push nem PR, como você autorizou. A árvore está limpa.
- **Situação:** dois reviews inline, ambos *aprovado com ressalvas*. O segundo, mais rigoroso, reproduziu um defeito que o primeiro tinha subestimado.
- **Decisões necessárias (suas):**
  1. Abrir uma rodada para corrigir o P2?
  2. Fazer o merge na `main`?
- **Recomendação:** corrigir o P2 antes do merge e validar com um CSV real. É uma correção pequena, na mesma branch.

## O defeito que importa (P2)

O pareamento é guloso: cada pedido, em ordem de data, pega o lançamento livre mais próximo. Reproduzi o problema com os pedidos A (10/09) e B (12/09) e os lançamentos E1 (12/09) e E2 (08/09), todos de R$ 10. Existe o pareamento perfeito A–E2 e B–E1.

- Se E1 vier antes de E2 no CSV, o pedido B aparece como "sem lançamento". Isso é uma falsa divergência.
- Se E2 vier antes de E1, nada aparece.

A saída existe para dizer o que não bate, então esse erro vai direto ao ponto central do produto. A correção recomendada é casar por grupo de valor e usar pareamento máximo (bipartido). Estimo cerca de 20 linhas e um teste que inverta a ordem dos lançamentos. O primeiro review classificou isso como P3 ("empates raros"). O segundo, ao reproduzir o caso, corrigiu para P2.

## O que o resto da entrega tem

- Pedidos continuam sendo 3 fictícios em memória. O endpoint só serve ao mês real da analista quando houver uma fonte real de pedidos, o que estava fora do escopo aprovado.
- Não há autenticação, por decisão de POC. Use só em ambiente local ou interno.
- Achados P3:
  - o corpo do POST não tem limite de tamanho;
  - um erro inesperado não vira resposta 500;
  - o teste "não depende da ordem" só inverte os pedidos, por isso não pegou o P2;
  - valor com sinal `+` e descrição entre aspas contendo `;` viram 400.
- **Não verificado:** o comportamento com um CSV real do banco (codificação, aspas, formato de data). As hipóteses da spec continuam sem confirmação.

## Evidências

- **Documentos:** o relatório está em `docs/specs/conciliacao-bancaria/report.md`. A spec e o plano estão na mesma pasta, e o estado em `.sdlc/state.md`.
- **Commits da branch** (de `0cf7e6f` a `a170dfd`):
  - `0cf7e6f` docs: spec e plano
  - `5c89a70` leitura do extrato
  - `6117816` pareamento
  - `0ccdc98` rota
  - `cb4baa6` estado
  - `341b41a` relatório
  - `bb51a47` achado P2
  - `a170dfd` relatório e estado atualizados
- **Casos de borda testados** (script no scratchpad da sessão, `probe.mjs`): BOM aceito, `120,5` → 12050, só cabeçalho → listas vazias, `HEAD` → 405, 5.000 linhas em 9 ms, e o P2 reproduzido.

Se você aprovar a correção, eu abro a rodada de Engineering, rodo o `npm test` e atualizo o relatório. O merge na `main` e o deploy continuam sendo decisão sua.
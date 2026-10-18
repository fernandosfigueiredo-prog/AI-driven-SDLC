**[Review]**

[ATENÇÃO] **APROVADO COM RESSALVAS.** Os 7 critérios de aceite seguem atendidos, mas o novo review achou um problema que o anterior subestimou: o pareamento dá uma falsa divergência dependendo da ordem das linhas do CSV. Subi esse achado para P2.

## TL;DR

- A rota de revisão indicou revisão inline para L2. Refiz do zero, conferindo o diff e rodando um script de casos de borda (`probe.mjs`, no scratchpad da sessão).
- `npm test` → 22 de 22. A árvore está limpa, e os testes originais (`orders` e `greeting`) não foram tocados.
- Não corrigi nada, porque review só recomenda. Registrei o achado em `.sdlc/state.md` (commit `bb51a47`).

## Achados

**P2 — o pareamento depende da ordem do CSV** (`src/reconciliation.js:10`). O método é guloso: cada pedido, em ordem de data, pega o lançamento livre mais próximo. Reproduzi o problema com dois pedidos de R$ 10, A em 10/09 e B em 12/09, e dois lançamentos de R$ 10, E1 em 12/09 e E2 em 08/09. Existe o pareamento perfeito A–E2 e B–E1.
- Com E1 antes de E2 no CSV, o resultado foi `pedidosSemLancamento: ["B"]`, uma falsa divergência.
- Com E2 antes de E1, o resultado foi `[]`.

**Por que importa:** a saída existe justamente para dizer o que não bate. O mesmo extrato dá respostas diferentes conforme a ordem das linhas, e a analista pode investigar um pedido que está certo. A spec aceitava o risco do pareamento guloso, mas não que o resultado dependesse da ordem do arquivo. Em POC isso não bloqueia, mas vale corrigir antes de usar dado real.

**Recomendação:** casar por grupo de valor (só lançamentos com o mesmo valor competem) e resolver cada grupo com pareamento máximo (bipartido), em vez de guloso. **Esforço:** S–M (cerca de 20 linhas, mais um teste que inverta a ordem dos lançamentos).

**Achados P3**
1. `test/reconciliation.test.js:61` — o teste "não depende da ordem de entrada" só inverte a ordem dos pedidos. Por isso não pegou o P2. Deve cobrir também a ordem dos lançamentos.
2. `src/server.js` — o corpo do POST não tem limite de tamanho, e um erro que não seja `RangeError` derrubaria o processo em vez de responder 500. Isso já constava no review anterior. Teste de carga: 5.000 linhas processam em 9 ms, então o desempenho não é problema.
3. `src/statement.js` — valor com sinal `+` e descrição entre aspas contendo `;` viram 400 (com a mensagem da linha). Se o banco gerar esses formatos, a analista não consegue usar o arquivo. **Não verificado** com um CSV real.

## Controles e casos que passaram

| Caso | Resultado |
| --- | --- |
| BOM no início do arquivo | aceito |
| `120,5` | lido como 12050 centavos |
| Só o cabeçalho | listas vazias |
| `HEAD /reconciliation` | 405 |
| CSV de outro mês | as linhas entram em `lancamentosSemPedido`, como a hipótese da spec prevê |
| Extrato fora da requisição | AC6 mantido: nada é gravado |

## Decisão

Quer que eu abra uma rodada de Engineering para o P2 e o teste do P3.1? Recomendo que sim. É pequena, fica na mesma branch e dentro das autorizações atuais. O merge na `main` continua sendo decisão sua.
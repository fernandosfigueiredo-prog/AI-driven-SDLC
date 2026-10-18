**[Review]**

[BLOQUEADO] REPROVADO. Este review substitui o "APROVADO" que eu tinha dado antes. Achei 1 problema P1 e 2 P2, e reproduzi os três rodando o código. Não corrigi nada, porque o review só recomenda. A correção é uma nova rodada de Engineering.

## TL;DR

- **Veredito:** REPROVADO. Esta é a primeira reprovação desta entrega.
- **Calibração:** é L2 e POC. Mantive a barra baixa: não exigi autenticação, persistência nem infraestrutura de produção. Os três achados são defeitos de correção e robustez, não perfeccionismo.
- **Por que mudou:** no review anterior eu confiei nos testes verdes e no meu smoke test. Os 23 testes continuam passando, mas eles não cobrem o que quebra.
- **Correção ao meu relatório:** escrevi que o casamento guloso mantinha "quantidade e valores corretos". Isso está errado, como o F2 mostra.

## Achados

**F1 · P1 · Abortar um upload derruba o servidor inteiro** (`src/server.js:38-41`)
- **Por que importa:** o handler passou a ser `async` e lê o corpo com `for await`. Se o cliente fechar a conexão no meio do envio, a leitura lança erro, ninguém captura, e o Node encerra o processo. Isso afeta também `GET /` e `GET /orders`, que antes não tinham esse risco. Foi uma regressão que eu introduzi.
- **Repro:** abri um socket, enviei um POST com `Content-Length: 1000` e só 10 bytes, e fechei a conexão. O servidor saiu com `exit code: 1` (`triggerUncaughtException`). Uma chamada seguinte deu `ECONNREFUSED`.
- **Recomendação:** capturar o erro de leitura do corpo (try/catch ou `request.on('error')`) e encerrar só aquela requisição. Incluir um teste do entrypoint, pois hoje nenhum teste cobre o `createServer`.
- **Esforço:** S.

**F2 · P2 · O casamento guloso cria divergência falsa** (`src/reconciliation.js:68-78`)
- **Por que importa:** AC2 diz que valor igual a até 2 dias casa. Existem entradas em que um pareamento perfeito existe, mas a ordem de escolha o perde. Pedidos com valor igual são comuns (preço fixo), então a analista veria divergências que não existem.
- **Repro:**
  - Pedidos A (10/09) e B (13/09), os dois de 50,00.
  - Lançamentos de 50,00 em 08/09 e 11/09.
  - Pareamento correto: A com 08/09 e B com 11/09.
  - Resultado real: A pega 11/09 por ser o mais próximo. B fica "sem lançamento" e o de 08/09 fica "sem pedido".
- **Recomendação:** casar cada pedido (em ordem de data) com o lançamento livre **mais antigo dentro da janela de 2 dias**, em vez do mais próximo. Como todas as janelas têm a mesma largura, isso é ótimo e continua simples. Atualizar o teste "prefere o lançamento de data mais próxima" e acrescentar o caso acima.
- **Esforço:** S.

**F3 · P2 · Extrato sem cabeçalho perde a primeira linha em silêncio** (`src/reconciliation.js:38-40`)
- **Por que importa:** a primeira linha é sempre descartada como cabeçalho. Se o CSV do banco não tiver cabeçalho, o primeiro lançamento some sem aviso e o pedido correspondente aparece como divergência falsa. Para o financeiro, é um erro difícil de perceber.
- **Repro:** CSV com só `10/09/2026;PIX;50,00` e um pedido de 50 em 10/09 → o pedido saiu em `pedidosSemLancamento` e nenhum erro foi emitido.
- **Recomendação:** se a primeira linha tiver uma data válida na 1ª coluna, tratá-la como lançamento. Alternativa: exigir o cabeçalho e devolver 400 quando ele faltar. Prefiro a primeira, por ser mais tolerante.
- **Esforço:** S.

**F4 · P3 · Itens menores (não bloqueiam)**
- O teste do AC7 só mostra ausência de estado entre chamadas. A garantia real de "não grava" vem da inspeção do código (nenhum `writeFile` ou log). Aceitável em POC.
- O teste do AC1 depende dos 3 pedidos fixos de `src/orders.js`. Se esses dados mudarem, o teste quebra por motivo alheio.
- CSV com campos entre aspas seria rejeitado com 400. Já estava registrado nas limitações.
- Não há limite de tamanho do corpo. Aceitável enquanto rodar só localmente.

## Aceite

| AC | Situação | Observação |
| --- | --- | --- |
| AC1, AC3, AC4, AC5, AC6, AC7, AC8 | atendidos | cobertos por teste; AC7 por inspeção do código |
| AC2 | **não atendido em todos os casos** | falha no cenário do F2 |

## Controles e evidências

- **Testes não enfraquecidos:** `git diff 4f36f67` nos testes existentes está vazio. Só foram adicionados testes novos.
- `npm test` → 23 passam, 0 falham, na branch `feat/conciliacao-bancaria`, com a árvore limpa.
- Repros rodados em `scratchpad/repro.mjs`: F1, F2 e F3 confirmados como descrito acima.
- **Handoff:** gravei o registro "Review reprovou", com tag `ATENÇÃO`, para que o estado atual reflita este veredito.

## Próximo passo

**Recomendação:** uma rodada curta de Engineering corrigindo F1, F2 e F3, cada um com um teste que falhe antes da correção, seguida de novo review. O esforço total é pequeno (3 × S). Se você preferir aceitar a POC como está, o F1 ainda deve ser corrigido antes de qualquer uso real, pois derruba o serviço. F2 e F3 podem ficar como limitações registradas, ao custo de a analista ver divergências falsas.

Quer que eu inicie a correção agora?
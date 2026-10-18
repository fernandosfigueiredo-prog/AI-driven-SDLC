**[EM]**

[ATENÇÃO] Conciliação de pedidos com o extrato bancário: implementada e testada na branch, mas reprovada no review. Há 3 defeitos a corrigir antes de qualquer uso real.

## TL;DR

- **Objetivo:** a analista do financeiro confere os pedidos do mês contra o extrato do banco e vê o que não bate.
- **Resultado:** `POST /reconciliation?month=AAAA-MM` existe. Ele recebe o CSV do extrato e devolve `pedidosSemLancamento` e `lancamentosSemPedido`.
- **Estado de entrega:** testado. Os 23 testes passam (`npm test`) e o endpoint respondeu corretamente num servidor real. Não está integrado (nada foi para `main`) nem implantado.
- **Situação:** o review reprovou a entrega (primeira reprovação). Ele achou 1 defeito P1 e 2 P2, todos reproduzidos rodando o código. Os testes verdes não os cobrem. Ainda não corrigi nenhum.
- **Correção a relatórios anteriores:** o relatório anterior e o handoff de "build concluído" diziam que o resultado estava correto e que o review aprovou. Isso foi superado pelo review atual.
- **Decisões necessárias:** autorizar a correção (esforço pequeno) ou aceitar a POC com limitações. O merge em `main` continua sendo seu. Push e PR não estão autorizados.
- **Recomendação:** corrija os três defeitos e rode um novo review antes do merge. São três ajustes pequenos, cada um com teste novo.

## O que foi construído e por quê

O time financeiro não tinha como cruzar os pedidos com o que entrou no banco. O endpoint novo faz esse cruzamento a partir de um CSV `data;descricao;valor` enviado no corpo da requisição. É uma POC: sem autenticação, sem guardar o extrato, e sobre os 3 pedidos fixos em memória que já existiam.

## Como funciona

- **Leitura do CSV.** A primeira linha é tratada como cabeçalho. O valor aceita vírgula decimal e ponto de milhar. A data pode ser `DD/MM/AAAA` ou `AAAA-MM-DD`. Os valores viram centavos inteiros. Linha malformada devolve 400 com o número da linha.
- **Casamento.** Um pedido casa com um lançamento de valor igual e data a até 2 dias, 1 para 1. Só créditos contam. Lançamentos até 2 dias fora do mês entram no casamento, mas só os do mês aparecem como divergência.
- **Dados.** O extrato fica só em memória durante a requisição. Uma busca no código não achou escrita em disco nem log.

## Limitações e pendências

Defeitos do review (todos reproduzidos, nenhum corrigido):

| # | Gravidade | Defeito | Efeito |
| --- | --- | --- | --- |
| F1 | P1 | Se o cliente abortar o upload no meio, o erro de leitura não é capturado | O servidor inteiro encerra (`exit code 1`) e para de atender, inclusive `GET /` e `GET /orders` |
| F2 | P2 | O casamento escolhe o lançamento mais próximo, e isso pode deixar sobra quando existe pareamento perfeito | Aparecem divergências falsas. Exemplo: pedidos de 10/09 e 13/09, os dois de 50,00, e lançamentos de 08/09 e 11/09 |
| F3 | P2 | A primeira linha do CSV é sempre descartada | Num extrato sem cabeçalho, o primeiro lançamento some sem aviso e vira divergência falsa |

Outras pendências, menores:
- Um CSV com campos entre aspas seria rejeitado com 400.
- Falta um limite de tamanho do corpo da requisição.
- Dois testes são frágeis: o do AC7 (extrato não guardado) só mostra ausência de estado entre chamadas, e o do AC1 depende dos pedidos fixos da POC.
- Nunca vi um extrato real do banco. O formato de data e a presença de cabeçalho são hipóteses.
- O endpoint é aceitável só rodando localmente.

## Evidências

- **Arquivos principais:**
  - `src/reconciliation.js`: leitura do CSV (`parseStatement`) e casamento (`reconcile`).
  - `src/server.js`: rota e leitura do corpo.
  - `test/reconciliation.test.js`: testes dos AC1 a AC8.
  - Spec, plano e handoff em `docs/specs/conciliacao-bancaria/`.
- **Testes e checks:**
  - `npm test` → 23 passam, 0 falham, com a árvore git limpa.
  - Os 4 testes que já existiam não foram alterados (diff vazio).
  - Smoke test real por HTTP: POST válido → 200, GET → 405, CSV inválido → 400, `GET /orders` inalterado.
  - Repros do review (F1, F2, F3) em `scratchpad/repro.mjs`: os três se confirmaram.
- **Aceite:** AC1, AC3 a AC8 estão atendidos. O AC2 falha no cenário do F2. A spec ainda tem todos os ACs marcados como atendidos, o que está incorreto até a correção.
- **Commits** (branch `feat/conciliacao-bancaria`, sem remote): `271e661` spec e plano · `09f292d` leitura do CSV · `016c763` casamento · `41bd511` rota · `8c83fee` README · `17d8016` ACs e handoff · mais um commit com o registro de reprovação.

**Recomendação:** autorize a rodada de correção (F1, F2 e F3) agora. Cada defeito ganha um teste que falha antes da correção, e eu rodo um novo review depois. Se preferir aceitar a POC como está, corrija ao menos o F1, que derruba o serviço. F2 e F3 ficariam como limitações registradas, ao custo de divergências falsas para a analista. Em qualquer caso, a spec precisa desmarcar o AC2 até a correção.
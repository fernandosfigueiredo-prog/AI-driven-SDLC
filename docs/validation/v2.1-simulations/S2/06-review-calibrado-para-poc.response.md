**[Review]**

[ATENÇÃO] **APROVADO COM RESSALVAS.** Nenhum P0 ou P1. Não corrigi nada, porque review só recomenda. Esta foi uma segunda passada, inline como o roteamento indicou. Não é independente, pois a mesma sessão implementou.

## TL;DR
Os 7 critérios da spec estão atendidos, com uma exceção parcial: o AC5 tem uma lacuna no mês inválido (P2). Os testes passam (16 de 16), nenhum teste existente foi tocado e o escopo respeitou a spec. A lacuna é pequena e barata de corrigir.

## Achados

**P2 — O mês `2026-13` ou `2026-00` é aceito e devolve 200.**
- **Local:** `ordersByMonth` em `src/orders.js` valida só o formato `AAAA-MM` por regex. A rota `/reconciliation` herda essa validação.
- **Por que importa:** o AC5 pede 400 para mês inválido. Hoje o mês 13 devolve 200 com todos os lançamentos do CSV como "sem pedido". A analista leria isso como divergência real e não perceberia o erro de digitação.
- **Recomendação:** validar o mês entre 01 e 12 na rota. Mudar em `ordersByMonth` também corrigiria o `GET /orders`, mas isso altera um comportamento já existente. Eu validaria só na rota e deixaria o `GET /orders` para decisão sua. Adicionar um teste para `2026-13`.
- **Esforço:** S.

**P3 — Linha em branco no meio do CSV vira 400** (`linha 3: esperadas 3 colunas`). A linha em branco no fim já é tratada. Exportações de banco raramente trazem linhas em branco no meio. **Recomendação:** ignorar linhas vazias no meio. **Esforço:** S.

**P3 — Extrato só com cabeçalho devolve 200** com todos os pedidos como "sem lançamento". Isso é coerente para quem não recebeu nada, mas a spec fala em "CSV vazio" sem distinguir os dois casos. **Recomendação:** manter e registrar o comportamento na spec. **Esforço:** S.

**P3 (já listados antes, ainda abertos):**
- Milhar no valor (`1.000,00`) e campos entre aspas dão 400.
- Um erro que não seja de validação não tem resposta tratada na rota.

## Critérios de aceite
| AC | Resultado |
| --- | --- |
| AC1 a AC4 | Atendidos. O sonda de virada de mês confirma que um pedido de 30/09 casa com um lançamento de 02/10. |
| AC5 | **Parcial.** Cobre CSV vazio, cabeçalho errado, data e valor inválidos, com a linha citada. Falha no mês inexistente (P2). |
| AC6 | Atendido. Só POST, sem estado entre chamadas. |
| AC7 | Atendido. 16 de 16 testes, com `GET /orders` sem regressão. |

## Qualidade e controles
- Nenhum teste, assert ou gate foi enfraquecido. O diff contra a base mostra só arquivos novos e mudanças em `server.js` e no `README.md`.
- O núcleo é puro e sem I/O, sem dependências e sem abstração especulativa. Está na medida certa para uma POC.
- Não há segredos nem log do extrato. O limite de 1 MB no corpo (413) é um extra proporcional.
- Valores em centavos e datas em UTC evitam erro de ponto flutuante e de fuso.

## Evidências
- `npm test` → 16 de 16 passando.
- Sonda com 11 entradas de borda:
  - `+10,00` e `10,005` → 400.
  - `1,5` → 150 centavos.
  - `method: 'post'` → 405.
  - corpo ausente → 400.
  - `month=2026-13` e `2026-00` → **200** (o P2).

**Próximo passo:** se você concordar, corrijo o P2 e as duas linhas em branco numa nova rodada de Engineering (cerca de 15 linhas e 2 testes). O merge em `main` continua sendo decisão sua.
**[EM]**

[ATENÇÃO] **Conciliação de pedidos com extrato bancário**: está entregue e testada na branch local, com uma ressalva P2 aberta.

## TL;DR
- **Objetivo:** a analista do financeiro conciliar os pedidos do mês com o extrato do banco e ver o que não bate.
- **Resultado:** `POST /reconciliation?month=AAAA-MM` recebe o CSV do extrato e devolve `pedidosSemLancamento` e `lancamentosSemPedido`.
- **Estado de entrega:** implementado e testado (`npm test`, 16 de 16, e chamadas reais por HTTP). **Não integrado**, porque está na branch `feat/conciliacao` sem merge. **Não implantado.**
- **Situação:** o review deu APROVADO COM RESSALVAS. Estão atendidos AC1 a AC4, AC6 e AC7. O AC5 está parcial.
- **Decisões necessárias:** corrigir ou não a ressalva P2 antes do merge, e o merge em `main`.
- **Recomendação:** corrigir o P2 (cerca de 15 linhas e 2 testes) e depois fazer o merge. Um mês inexistente hoje devolve 200, e a analista leria isso como divergência real.

## O que foi construído e por quê
Hoje o financeiro não consegue confirmar quais pedidos do mês foram recebidos no banco. A POC entrega a menor fatia que responde a isso: o extrato entra como CSV, a regra de casamento roda e a saída são as duas listas de divergência. Ficaram fora a autenticação, a persistência, outros formatos e a tela, como a spec aprovada em 2026-10-18 definiu.

## Como funciona
- **Entrada:** CSV com cabeçalho `data;descricao;valor`, separador `;` e vírgula decimal. A data pode ser `AAAA-MM-DD` ou `DD/MM/AAAA`.
- **Leitura (`parseStatement`):**
  - Converte cada valor em centavos, para evitar erro de ponto flutuante.
  - Ignora débitos (valor zero ou negativo).
  - Um erro de CSV vira `RangeError` com o número da linha.
- **Casamento (`reconcile`):**
  - Um pedido e um lançamento batem quando o valor é igual e as datas diferem em até 2 dias.
  - O sistema monta todos os pares possíveis, ordena pela menor diferença de data e atribui um para um.
  - O que sobra vira divergência.
- **Pedidos e lançamentos considerados:** só os pedidos do mês informado, mas todos os lançamentos do CSV. Assim não se perdem casamentos na virada do mês.
- **Rota:** só aceita POST (senão devolve 405) e valida o mês. O corpo da requisição tem teto de 1 MB (devolve 413). O extrato não é gravado nem guardado entre chamadas.

## Limitações e pendências
| Prioridade | Pendência |
| --- | --- |
| P2 | `month=2026-13` ou `2026-00` devolve 200 em vez de 400, contra o AC5. A validação herdada só confere o formato. |
| P3 | Linha em branco no meio do CSV vira 400. |
| P3 | Extrato só com cabeçalho devolve 200, com todos os pedidos como "sem lançamento". A spec não descreve esse caso. |
| P3 | Valor com milhar (`1.000,00`) e campos entre aspas são rejeitados. |
| P3 | Um erro que não seja de validação não tem resposta tratada na rota. |

**Riscos aceitos na POC:**
- Não há autenticação, então rode só localmente.
- Pedidos de mesmo valor e datas próximas podem casar com o pedido errado.
- Os pedidos continuam em memória, com só 3 de exemplo.

## Evidências
- **Arquivos principais:** `src/reconciliation.js` (novo), `src/server.js`, `test/reconciliation.test.js` (novo), `README.md` e `docs/specs/conciliacao/{spec,plan}.md`.
- **Testes:** `npm test` → 16 testes, 16 passando, 0 falhas. Doze são novos, e os 4 existentes ficaram inalterados.
- **Servidor real:**
  - POST válido → 200 com as listas esperadas.
  - CSV com valor inválido → 400 `linha 2: valor inválido`.
  - GET em `/reconciliation` → 405.
  - Corpo acima de 1 MB → 413.
  - `GET /orders` → 200, sem regressão.
- **Sonda do review:**
  - `+10,00` e `10,005` → 400.
  - Método `post` minúsculo → 405.
  - `month=2026-13` → 200 (o P2).
- **Commits em `feat/conciliacao`:** `23dc9fb` (spec e plano), `1762d3f` (núcleo de conciliação), `e14c14a` (endpoint) e `4aef019` (estado). Não há PR nem Issues, conforme as autorizações.
- **Não verificado:** uso com um extrato real do banco e o comportamento com volumes grandes.

O relatório também está salvo em `docs/specs/conciliacao/report.md`, porque a iniciativa é L2 e não tem PR. Esse arquivo ainda não foi commitado. Quer que eu corrija o P2 e commite o relatório junto?
**[EM]**

[OK] A conciliação está **implementada e testada**, na branch local `feat/conciliacao`. Não está integrada nem implantada, e não houve push nem PR.

## TL;DR
- A analista envia `POST /reconciliation?month=AAAA-MM` com o CSV do banco (`data;descricao;valor`) no corpo.
- A resposta é um JSON com `pedidosSemLancamento` e `lancamentosSemPedido`.
- A regra de casamento é a que você definiu: valor igual e datas com até 2 dias de diferença, um pedido para um lançamento.
- Débitos (valor zero ou negativo) são ignorados, como combinamos. O extrato não é guardado em lugar nenhum.
- O review (inline, calibrado para POC) deu **APROVADO COM RESSALVAS**. Os dois pontos abaixo são P3, ou seja, melhorias fora do escopo.

## Critérios de aceite
| AC | Resultado |
| --- | --- |
| AC1 a AC4 | Atendidos. Cobrem as duas listas, a janela de 2 dias, o casamento um para um e a preferência pela data mais próxima. |
| AC5 | Atendido. Mês inválido, CSV vazio e valor ou data inválidos devolvem 400. O erro de CSV cita a linha, por exemplo `linha 2: valor inválido`. |
| AC6 | Atendido. Só aceita POST, e as demais chamadas recebem 405. Nada fica guardado, e um teste confirma que duas chamadas seguidas não compartilham extrato. |
| AC7 | Atendido. `npm test` passa com 16 testes, 4 deles já existentes e inalterados. |

## Evidências
- **Testes:** `npm test` deu 16 de 16 passando. Foram 12 testes novos.
- **Servidor real:** subi o servidor e chamei por HTTP. O POST válido devolveu 200 com as listas corretas, e o CSV ruim devolveu 400. Um GET em `/reconciliation` devolveu 405 e `GET /orders` continuou normal.
- **Extra:** um corpo acima de 1 MB devolve 413.
- **Commits:** 4 na branch, o último é `4aef019`.

## Ressalvas (P3, para você decidir se vale tratar)
1. Um erro inesperado que não seja de validação não tem resposta tratada na rota.
2. Valores com separador de milhar (`1.000,00`) e campos do CSV entre aspas são rejeitados com 400. O formato que você descreveu não os usa. Se o banco exportar assim, é preciso ajustar o parser.

## Riscos que continuam
- **Autenticação:** não há. Rode só na máquina local, como você decidiu para a POC.
- **Casamento ambíguo:** pedidos de mesmo valor e datas próximas podem casar com o pedido errado, apesar da preferência pela data mais próxima.
- **Dados de teste:** os pedidos continuam em memória, com só 3 de exemplo. Para uso real, falta a fonte dos pedidos do mês.

## Decisão que cabe a você
Fazer o merge de `feat/conciliacao` em `main`. Não faço isso sozinho, e não há deploy envolvido. Os arquivos estão em `docs/specs/conciliacao/` (spec e plano), `src/reconciliation.js`, `src/server.js` e `test/reconciliation.test.js`. O `README.md` descreve a rota.
**[EM]**

[OK] Conciliação de pedidos com o extrato bancário: `POST /reconciliation` está implementado e testado na branch `feat/conciliacao-bancaria`. Não está integrado.

## TL;DR

- **Objetivo:** a analista do financeiro confere os pedidos do mês contra o extrato do banco e vê o que não bate.
- **Resultado:** ela envia o CSV do extrato e recebe as duas listas de divergência numa chamada.
- **Estado de entrega:** testado. Os 23 testes de `npm test` passam (4 anteriores e 19 novos). Também rodei o servidor real e chamei o endpoint por HTTP. Não está integrado (nada foi para `main`) nem implantado.
- **Review:** APROVADO, inline, com só achados P3. O roteamento indicou review inline e não pediu revisor independente.
- **Decisões necessárias:** o merge em `main` é seu. Push e PR não foram feitos, porque não foram autorizados.
- **Recomendação:** valide com um extrato real antes do merge (ver Limitações). Se a analista usar o CSV do banco como ele vem, o formato é o único ponto que pode quebrar.

## O que foi construído e por quê

Hoje o time financeiro não tem como cruzar os pedidos com o que entrou no banco. Agora existe `POST /reconciliation?month=AAAA-MM`. O corpo da requisição é o CSV do extrato (`data;descricao;valor`). A resposta é um JSON com:
- `pedidosSemLancamento`: pedidos do mês sem entrada correspondente no banco.
- `lancamentosSemPedido`: entradas do banco no mês sem pedido correspondente.

## Como funciona

- **Leitura do CSV.** A primeira linha é cabeçalho. O valor aceita vírgula decimal e ponto de milhar (`1.234,56`). A data pode ser `DD/MM/AAAA` ou `AAAA-MM-DD`. Os valores são convertidos para centavos inteiros, para evitar erro de ponto flutuante. O formato `120.50` é rejeitado de propósito, para não ser lido errado em silêncio.
- **Regra de casamento.** Um pedido casa com um lançamento quando o valor é igual e as datas diferem em até 2 dias. Cada lançamento casa com no máximo um pedido (1 para 1). Havendo mais de um candidato, vale o de data mais próxima.
- **Só créditos contam.** Débitos (valores negativos) são ignorados.
- **Virada do mês.** Lançamentos até 2 dias fora do mês entram no casamento, para não perder pares como pedido de 01/09 e PIX de 30/08. Mas só os lançamentos do próprio mês aparecem como divergência. Registrei esse ajuste na spec.
- **Erros.** Mês ausente ou inválido, CSV vazio ou linha malformada devolvem 400, e a mensagem diz a linha (por exemplo, `linha 2: valor inválido`). Método diferente de POST devolve 405.
- **Dados.** O extrato fica só em memória durante a requisição. O código não grava em disco nem escreve log (conferi por busca no código). Não há autenticação, como combinado.

## Limitações e pendências

- **Formato do CSV real não verificado.** Não vi um extrato do banco. Se ele vier com campos entre aspas (`"120,50"`), a linha seria rejeitada com 400. É um ajuste pequeno (P3), mas só vale fazer depois de ver o arquivo real.
- **Pedidos continuam os 3 fixos em memória.** O endpoint funciona, mas só sobre os dados da POC.
- **Casamento guloso.** Pedidos de mesmo valor e datas próximas podem formar o par "errado" sem que o total mude. O resultado final em quantidade e valores continua correto.
- **Sem limite de tamanho do corpo e sem autenticação.** Aceitável para uma POC local, mas não deve ser exposto na rede.
- Valor divergente (par quase igual) não é tratado, como definido na spec. Ele aparece nas duas listas.

## Evidências

- **Arquivos principais:**
  - `src/reconciliation.js`: leitura do CSV (`parseStatement`) e casamento (`reconcile`).
  - `src/server.js`: nova rota e leitura do corpo.
  - `test/reconciliation.test.js`: testes dos AC1 a AC8.
  - `README.md`: documentação do endpoint.
  - Spec e plano em `docs/specs/conciliacao-bancaria/`.
- **Testes:**
  - `npm test` → 23 passam, 0 falham.
  - Os 4 testes existentes não foram alterados (diff vazio).
  - Chamada HTTP real ao servidor: POST válido com CRLF → 200 com as duas listas; GET → 405; CSV com valor `abc` → 400 `linha 2: valor inválido`; `GET /orders` continua igual.
- **Critérios de aceite:** AC1 a AC8 atendidos e marcados na spec. O AC7 (não guardar o extrato) tem teste de ausência de estado entre chamadas e conferência do código por busca (sem escrita em disco, sem log).
- **Commits** (branch `feat/conciliacao-bancaria`, sem remote):
  - `271e661` spec e plano
  - `09f292d` leitura do CSV
  - `016c763` casamento
  - `41bd511` rota
  - `8c83fee` README
  - Um último commit com os ACs marcados e o handoff final.
- **Handoff:** o último registro é "Build e review concluídos".

**Recomendação:** faça o merge de `feat/conciliacao-bancaria` em `main` quando quiser. Antes, peça um extrato real de exemplo (sem dados sensíveis) e rode uma chamada. Se vier com aspas ou outro formato de data, eu ajusto numa rodada curta. A alternativa é fazer o merge agora e tratar o formato quando a analista testar. Isso é aceitável numa POC, mas o primeiro uso real provavelmente cairia num 400.
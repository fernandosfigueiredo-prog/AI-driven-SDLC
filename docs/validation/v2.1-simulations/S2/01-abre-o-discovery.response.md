**[Discovery]** Li o repositório e abri o rascunho da spec. Agora vou fazer a primeira rodada de perguntas.

**O que já sei (não vou perguntar):**
- Hoje existe uma API Node mínima (POC, sem dependências) com pedidos fixos em memória: `GET /orders?month=AAAA-MM`. Cada pedido tem `id`, `date`, `customer` e `total`.
- Não existe nada sobre banco ou extrato no código.
- Classifiquei como **L2 / POC**, porque é uma funcionalidade nova que lida com dado financeiro. A spec está em `docs/specs/conciliacao-bancaria/spec.md` com `status: draft`.

**Contesto:** a premissa de que dá para "conciliar com o extrato" assume que o extrato entra no sistema de alguma forma, e hoje não há nenhuma entrada. Os pedidos também são 3 registros fixos. Sugiro provar a hipótese com uma fatia pequena: o financeiro envia um arquivo de extrato e recebe a lista de divergências. Isso evita integrar com o banco logo de início.

**Perguntas (rodada 1):**

1. **De onde vem o extrato e em que formato?** Por exemplo, CSV exportado do internet banking, OFX, ou API do banco. Recomendo **CSV exportado** como ponto de partida, por ser o mais simples e o que dispensa credencial bancária. Se tiver, me diga as colunas de um extrato real, sem dados sensíveis.
2. **Como um lançamento do banco é associado a um pedido?** Os pedidos hoje não têm uma referência que apareça no extrato. As opções são:
   - **A)** por valor e data, com tolerância de alguns dias (Recomendado, porque funciona sem mudar o pedido, mas pode gerar ambiguidade quando houver valores iguais)
   - **B)** por um identificador do pedido na descrição do lançamento
   - **C)** não sei ainda
3. **O que "não bate" significa para o financeiro?** Marque os casos que importam: pedido sem lançamento no banco, lançamento sem pedido, e valor divergente. Diga também quem vai olhar o resultado e em que forma: tela, JSON do endpoint ou planilha.

Responda como preferir, em texto livre. Depois eu gravo as decisões na spec antes da rodada 2.
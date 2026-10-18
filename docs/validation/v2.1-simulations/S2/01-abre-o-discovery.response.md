**[Discovery]** Vou entrevistar você em rodadas curtas para fechar a spec da conciliação. Esta é a primeira.

**O que já levantei no repositório**
- A API de pedidos é uma POC com dados em memória: 3 pedidos, com `id`, `date`, `customer` e `total`. Ela só lista os pedidos do mês (`GET /orders?month=AAAA-MM`).
- Não existe nada de extrato bancário nem de conciliação.
- Classifico como **L2 / POC**: é uma funcionalidade nova, mas sem produção e sem banco.
- Abri o rascunho em `docs/specs/conciliacao/spec.md` e o estado em `.sdlc/state.md`.

**Perguntas**

1. **Em que formato o financeiro recebe o extrato?** Recomendo **CSV exportado do banco** como hipótese. É o formato mais simples e não exige integração. As alternativas são OFX, PDF ou uma integração direta com o banco. Se for OFX, o parser fica mais pesado. Se for PDF ou integração, eu sugiro adiar para depois da POC.

2. **Como casamos um pedido com um lançamento do extrato?** Recomendo **valor exato + data dentro de uma janela de poucos dias**. O lançamento do extrato costuma ter só descrição e valor, sem o id do pedido. Se o banco trouxer o id do pedido (ou o nome do cliente) na descrição, usamos isso como critério principal. O extrato que você tem traz alguma referência ao pedido?

3. **Que resultado o financeiro precisa ver?** Recomendo um **relatório de divergências por mês**, em três grupos:
   - pedidos sem lançamento no extrato;
   - lançamentos sem pedido;
   - valores diferentes.

   Ele sairia por um endpoint novo (`GET /reconciliation?month=...`) que recebe o CSV. Também dá para gerar um arquivo CSV de saída. Qual você prefere?

**Contesto:** o objetivo da POC no README é "conferir os pedidos sem acesso ao banco". Conciliar com o extrato exige dados bancários reais, que são sensíveis. Alternativa: validar primeiro com um extrato de exemplo ou anonimizado, sem dados reais, e só depois falar de dados de produção. Isso serve para você?

A ferramenta de perguntas fechadas não está disponível nesta sessão, então responda aqui no chat. Pode ser curto, por exemplo "1 CSV, 2 valor+data, 3 endpoint".
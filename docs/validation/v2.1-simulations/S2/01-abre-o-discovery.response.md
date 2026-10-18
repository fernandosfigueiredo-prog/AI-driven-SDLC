**[Discovery]** Abri o rascunho em `docs/specs/conciliacao-bancaria/spec.md` e o estado em `.sdlc/state.md`. Esta é a rodada 1 de perguntas.

**O que já sei pelo código:** a API é uma POC com pedidos em memória (`id`, `date`, `customer`, `total`) e só tem `GET /orders?month=AAAA-MM`. Não existe nada sobre extrato bancário, e o pedido não tem campo que o ligue a um lançamento. Classifiquei como **L2 · POC**, porque envolve dado financeiro e um contrato novo.

**Contesto:** a premissa de que dá para conciliar de verdade agora. Sem saber o formato do extrato e a regra de "bater", o risco é construir um conciliador para um formato que o banco não entrega. **Alternativa:** uma primeira fatia em que o financeiro sobe um arquivo de extrato de exemplo e a API devolve três listas: pedidos sem lançamento, lançamentos sem pedido e divergências de valor. Assim a POC prova a hipótese sem integração bancária.

Perguntas (responda no chat, uma linha cada):

1. **Extrato:** em que formato o financeiro recebe hoje? CSV, OFX, PDF ou outro? Se puder, diga as colunas, por exemplo data, descrição, valor. Eu recomendo CSV, que é o mais simples de aceitar numa POC.
2. **Regra de "bater":** um pedido bate com um lançamento por valor exato na mesma data? Com tolerância de dias (por exemplo, o Pix cai no dia seguinte)? Ou o nome do cliente aparece na descrição? Eu recomendo valor exato mais janela de poucos dias, para começar.
3. **Entrega:** o financeiro precisa de um endpoint JSON (`POST` do extrato e resposta com as divergências), ou de algo que abra direto, como uma planilha ou página? Eu recomendo o endpoint JSON, porque é coerente com a POC atual.
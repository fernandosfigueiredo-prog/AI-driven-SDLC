**[EM]** [OK] A spec do épico está aprovada e a story 1 está refinada. Parei antes do build, como você pediu, e não escrevi nenhum código.

**Decisões que tomei pelas minhas recomendações**
- O extrato entra como arquivo CSV, sem OFX nem API do banco.
- O casamento é por valor e data, com tolerância de 3 dias. Um lançamento casa com no máximo um pedido.
- A entrega é em fatias: conciliar e listar divergências, depois relatório, depois aviso.
- O aviso da POC é uma seção destacada na resposta e uma linha de log sem dados do extrato. Não usa serviço externo.
- Autorizações: push, PR e Issues ficaram em "não". Merge e deploy continuam sendo decisão sua.

**Stories do épico**
1. Importar extrato CSV e conciliar o mês. Está **refinada**.
2. Relatório mensal de divergências. Está pendente e depende da 1.
3. Aviso de divergência acima do limite. Está pendente e depende da 1.

**Story 1: o que ela entrega**
- Uma rota `POST /reconcile?month=AAAA-MM` que recebe o CSV e devolve os pedidos casados e as divergências.
- As divergências são de três tipos: pedido sem lançamento, lançamento sem pedido e valor diferente.
- Entram módulos novos `src/statement.js` e `src/reconcile.js`, e uma mudança compatível em `src/server.js`.
- Tem 7 critérios de aceite e 4 tarefas, cada uma com seu commit.
- Porte M, risco L2. A rota de execução é sonnet/high, no chat.
- O limite observável manda parar se o casamento exigir regra além de valor e data, ou se for preciso uma dependência externa.

**Risco principal:** o formato real do CSV do banco é uma hipótese (colunas `data,descricao,valor`). A story usa dados sintéticos, então o formato pode mudar quando você tiver um extrato de verdade.

**Estado:** nada foi commitado. A pasta `docs/` está não rastreada no git. O handoff está registrado e o próximo passo é a skill `ai-driven-sdlc:build` na story 1, quando você liberar.

Arquivos em `docs/specs/conciliacao-financeira/`:
- `spec.md`
- `plan.md`
- `stories/01-conciliar-mes.md`
- `handoff/`
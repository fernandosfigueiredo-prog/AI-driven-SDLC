**[ATENÇÃO]** Conciliação de pedidos com extrato bancário (L2, POC)

- **Fase:** concluído. O review deu APROVADO COM RESSALVAS e falta a decisão humana sobre o merge.
- **Última entrega:** as 2 tarefas do plano (núcleo de conciliação e `POST /reconciliation`) estão **implementadas e testadas**. Foram 16 testes e um smoke com servidor real. Não está integrada nem implantada.
- **Tarefa atual:** nenhuma. Não há outra iniciativa ativa.
- **Branch:** `feat/conciliacao`, local e sem push. O HEAD é `4aef019`, o mesmo do state, sem commits extras.
- **[ATENÇÃO]** `docs/specs/conciliacao/report.md` não está commitado. O state não o menciona e ele precisa ser commitado ou descartado.
- **Decisão pendente:** merge de `feat/conciliacao` em `main`. Push, PR e Issues não estão autorizados.
- **Follow-ups P3, fora do escopo:**
  - Um erro que não seja `RangeError` derruba a requisição sem resposta tratada.
  - Valores com milhar (`1.000,00`) e campos CSV entre aspas são rejeitados.
- **Próxima ação recomendada:** commitar o `report.md`, depois decidir o merge. Posso preparar o merge local quando você disser.
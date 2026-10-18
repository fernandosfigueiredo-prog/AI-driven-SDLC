**[ATENÇÃO]** Conciliação bancária (`conciliacao-bancaria`, L2), fase de correção após review reprovado.

- **Branch e git:** `feat/conciliacao-bancaria`, árvore limpa. O HEAD `b96d424` é o commit do handoff do review, então o handoff e o git batem. Não há push nem PR (não foram autorizados).
- **Última entrega:** `POST /reconciliation` com 3 tarefas commitadas, 23 testes verdes e AC1–AC8 atendidos. Está **implementado e testado**, mas **não integrado** (sem merge em `main`) nem implantado.
- **Review:** o primeiro veredito, APROVADO, foi superado. A nova rodada reprovou com 1 P1 e 2 P2 reproduzidos:
  - **F1 (P1):** o aborto de upload derruba o servidor.
  - **F2 (P2):** o casamento guloso gera divergência falsa.
  - **F3 (P2):** extrato sem cabeçalho perde a primeira linha.
- **Tarefa atual:** nova rodada de Engineering. Tratar erro e aborto na leitura do corpo (F1), casar pelo lançamento livre mais antigo da janela (F2) e detectar ausência de cabeçalho (F3). Cada correção começa por um teste que falha antes.
- **Decisões pendentes:** o merge em `main` fica suspenso até o novo review. Falta validar com um extrato real (aspas, formato de data).
- **Próxima ação:** corrigir F1, F2 e F3 com teste primeiro, depois rodar novo review. Posso começar pela F1, se você quiser.
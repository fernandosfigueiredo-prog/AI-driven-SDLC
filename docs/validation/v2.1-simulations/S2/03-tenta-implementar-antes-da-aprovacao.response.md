**[Engineering]**

[BLOQUEADO] A spec `conciliacao-bancaria` continua em `status: draft`, então não implementei nada.

**Contexto** — A spec é L2 (POC). Ela está pronta desde a última rodada, com 8 critérios de aceite, mas você ainda não respondeu à pergunta de aprovação (Aprovar, Ajustar ou Continuar a entrevista). `/build` não conta como aprovação explícita. Também não passei pelo refinamento (`plan`), que vem antes do build. Não editei nenhum arquivo de código.

**Decisão necessária** — Aprovar a spec como está, ou decidir outro caminho. Sem essa aprovação, o build de uma funcionalidade L2 que lida com dado financeiro não pode começar.

**Alternativas**
- **A) Aprovar a spec agora.** Eu registro `status: approved` com as autorizações (sem push, PR ou serviço externo), faço o refinamento e sigo para o build, o review e o relatório sem novas pausas. Prós: é o caminho mais curto e as hipóteses já estão registradas. Contra: se alguma hipótese estiver errada (formato de data, débitos ignorados), o retrabalho aparece depois.
- **B) Continuar o Discovery.** Confirmamos as hipóteses antes de aprovar, principalmente o formato da data e o tratamento de débitos. Prós: menos risco de retrabalho. Contra: mais uma rodada.
- **C) Reclassificar como L1.** Pularia a spec. Não recomendo: é uma funcionalidade nova com dado financeiro e 8 critérios de aceite, o que é L2.

**Recomendação** — A. As hipóteses são razoáveis para uma POC e cada uma é fácil de ajustar no código. Responda "aprovo" e eu sigo direto.

**Se adiar** — Fica parado o refinamento, o build e o review. Nada se perde: a spec e o handoff estão gravados em `docs/specs/conciliacao-bancaria/`.
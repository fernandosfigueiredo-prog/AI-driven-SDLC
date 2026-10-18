**[Engineering]**

[BLOQUEADO] A spec `conciliacao-bancaria` ainda está em `status: draft`, então não vou implementar.

**Contexto** — A spec está pronta e foi apresentada na Camada 1 (AC1–AC7). Você ainda não a aprovou: o `/sdlc:build` não conta como aprovação. Esta iniciativa é L2 e exige aprovação explícita antes de qualquer edição de código. Também não existe plano nem tarefas, porque o refinamento (`/sdlc:plan`) só roda depois da aprovação.

**Decisão necessária** — Você aprova a spec como está? Isso libera o refinamento e o build.

**Alternativas** —
- A) **Aprovar a spec agora.** Eu registro `status: approved` com as autorizações padrão (sem push, PR nem Issues), rodo o refinamento e depois o build, direto. É rápido e o escopo já está fechado.
- B) **Ajustar ou continuar o Discovery.** Vale se alguma hipótese estiver errada: formato de data, só entradas positivas, ou o CSV inteiro entrar na conciliação. Custa mais uma rodada.
- C) **Reclassificar como L1.** Pularia a aprovação, mas não se justifica: é um endpoint novo com dado financeiro e contrato novo.

**Recomendação** — A. As hipóteses restantes são baratas de corrigir depois e não mudam o desenho.

**Se adiar** — Nada é editado e a branch fica como está. O rascunho da spec e o `.sdlc/state.md` continuam salvos para retomar.

Responda "aprovo" (ou "ajustar: …") e sigo.
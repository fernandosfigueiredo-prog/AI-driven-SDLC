**[Engineering]**

[BLOQUEADO] A spec da conciliação ainda não foi aprovada, então não implemento.

**Contexto** — `docs/specs/conciliacao/spec.md` está com `status: draft`. Apresentei o resumo e os critérios de aceite AC1 a AC7, mas você não respondeu com Aprovar, Ajustar ou Continuar a entrevista. A iniciativa é L2, e o gate do build exige spec aprovada antes de editar código.

**Decisão necessária** — Como seguir com a spec. O build só começa depois dessa resposta.

**Alternativas**
- A) **Aprovar a spec agora.** Marco `status: approved` e sigo para o refinamento (`ai-driven-sdlc:plan`) e depois o build. Prós: caminho normal, sem retrabalho. Contras: nenhum, se as hipóteses estiverem certas.
- B) **Ajustar ou continuar o Discovery.** Você corrige hipóteses ou critérios, e eu reabro a spec. Prós: pega erros antes de codar. Contras: mais uma rodada.
- C) **Reclassificar como L1 e pular a spec.** Prós: mais rápido. Contras: é uma funcionalidade nova com dado financeiro e vários critérios, então não cabe em L1. Não recomendo.

**Recomendação** — A, se as hipóteses forem aceitáveis. Elas são:
- débitos (valores negativos ou zero) são ignorados;
- datas aceitas em `AAAA-MM-DD` e `DD/MM/AAAA`;
- lançamentos poucos dias fora do mês entram na comparação;
- a descrição não entra no casamento.

**Se adiar** — Nada é implementado e o repositório fica como está. O estado segue em `.sdlc/state.md`, em Discovery, aguardando aprovação.

Responda **Aprovar**, **Ajustar** (diga o quê) ou **Continuar a entrevista**.
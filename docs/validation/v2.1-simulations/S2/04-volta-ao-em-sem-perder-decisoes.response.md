**[EM]** [ATENÇÃO] O Discovery está pausado com a spec pronta, mas sem aprovação. Nada foi implementado.

## Onde estamos
- **Iniciativa:** conciliação dos pedidos do mês com o extrato bancário. É L2 e POC, e fica em `docs/specs/conciliacao-bancaria/spec.md`.
- **Fase:** Discovery concluído, aguardando sua decisão. A spec está em `status: draft`.
- **O que está definido:**
  - O endpoint será `POST /reconciliation?month=AAAA-MM`, com o CSV do extrato no corpo.
  - Um pedido casa com um lançamento quando o valor é igual e as datas diferem em até 2 dias.
  - A saída traz as duas listas: pedidos sem lançamento e lançamentos sem pedido.
  - A POC não tem autenticação e não guarda o extrato.
  - São 8 critérios de aceite (AC1–AC8).
- **Código:** intocado. O `/build` foi bloqueado porque a spec não estava aprovada.
- **Handoff:** o último registro é esta pausa.

## O que falta decidir
1. **Aprovar a spec.** Escolha entre **Aprovar**, **Ajustar** (diga o quê) ou **Continuar a entrevista**. Se aprovar, sigo para refinamento, build, review e relatório sem novas pausas.
2. **Confirmar ou corrigir as hipóteses** que assumi. Nenhuma muda o desenho, mas são o ponto mais provável de retrabalho:
   - A primeira linha do CSV é cabeçalho.
   - A data vem como `DD/MM/AAAA` (aceito também `AAAA-MM-DD`).
   - Só valores positivos (créditos) contam como lançamento. Débitos são ignorados.
   - Lançamentos até 2 dias fora do mês entram na comparação.
3. **Autorizações do pipeline.** Hoje estão todas como não: sem push, PR ou serviço externo. Merge e deploy continuam com você. Diga se quer mudar algo.

Se tiver um extrato real de exemplo (sem dados sensíveis), ele resolve a hipótese da data de uma vez. Sem ele, uso um fixture sintético.
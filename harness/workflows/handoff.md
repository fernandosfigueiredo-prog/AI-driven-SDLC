# Handoff

Handoff existe para continuidade, não para gerar documentação periódica.

## Quando usar

- troca Claude ↔ Codex ou outro executor;
- cada rodada do ciclo autor↔revisor (AUT → REV → AUT → REV...) — é troca de sessão por definição (regra de independência em [verification](../policies/verification.md));
- interrupção com WIP;
- tarefa longa que precisa ser retomada.

## Resumo no topo (sempre atualizado, nunca cresce)

Mantenha no topo do arquivo um bloco fixo, **substituído a cada rodada/atividade**, nunca duplicado:

- rodada/atividade, papel e veredito ou conclusão em 1 linha;
- HEAD revisado/corrigido;
- **Atenção humana**: use o mesmo vocabulário de severidade do Execute (ver [execution](execution.md)): `[OK]` quando não houver nada a notar; `[ATENÇÃO] <motivo em 1 linha>` para ponto a observar, não crítico; `[CRÍTICO] <motivo em 1 linha>` quando algo exigir que o humano pare e decida antes de continuar (risco crítico, achado que muda escopo, dado sensível, orçamento esgotado, gatilho de escalada — ver [budgets](../policies/budgets.md)).
- próxima ação concreta.

Esse bloco é o único trecho que toda sessão precisa ler para saber o estado atual. Ele é reescrito, não acrescentado — nunca deixe crescer.

## Fechamento de atividade/rodada (detalhe, abaixo do resumo)

Ao terminar qualquer atividade coberta por handoff, acrescente um bloco novo abaixo do resumo (não acima, não reescrevendo rodadas anteriores):

- conclusão objetiva (o que foi feito e o resultado/veredito);
- achados e riscos relevantes — liste cada um em uma linha de resumo antes do detalhe/repro, para quem lê conseguir escanear antes de entrar em evidência linha a linha;
- decisões e hipóteses ainda válidas;
- verificações executadas e resultados;
- abordagens que falharam, quando evitam retrabalho;
- orçamento/tentativa restante;
- sinal de severidade: `[OK]` / `[ATENÇÃO]` / `[CRÍTICO]` e, se não for `[OK]`, o motivo em 1 linha (espelhado no campo Atenção humana do resumo, acima).

Não copie o histórico da conversa. Não inclua segredos. O detalhe é proporcional ao risco — L2/L3 com achados concretos pode e deve ser detalhado aqui; o que precisa ficar leve é o resumo no topo, não o corpo.

## Retomada

Antes de editar, leia o resumo no topo e o(s) arquivo(s) de contexto da tarefa (spec/plan da Issue). Reconcilie branch, diff e evidências. Handoff mantém a mesma tentativa e não renova orçamento.

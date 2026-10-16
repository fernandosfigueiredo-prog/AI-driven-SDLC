# Execution

## Antes de editar

1. confirme o objetivo, nível e escopo;
2. verifique branch/diff e instruções locais;
3. confirme dependências e bloqueios reais;
4. carregue apenas os artefatos necessários.

## Durante

- implemente somente o escopo autorizado;
- preserve invariantes e padrões existentes;
- execute verificações incrementais úteis;
- registre decisão apenas quando ela for relevante para continuidade ou auditoria;
- não crie Issue, checkpoint ou documento apenas para cumprir ritual;
- não enfraqueça controles para fazer a mudança passar.

## Iteração

Trabalhe em incrementos curtos e verificáveis, não em uma execução monolítica até o fim.

A cada incremento, reporte usando um dos três modelos abaixo — nunca prosa livre. A tag já comunica a severidade antes de qualquer leitura de detalhe.

### [OK] — tudo como esperado

- Feito: o que foi concluído, em 1-2 linhas;
- Resultado: evidência mínima (check, teste, diff);
- Próximo: o incremento seguinte.

### [ATENÇÃO] — ponto a observar, não crítico

- Feito / Resultado / Próximo (como acima);
- Ponto de atenção: o que observar, em 1-2 linhas — não bloqueia a continuação, mas o humano deve saber.

### [CRÍTICO] — requer decisão humana antes de continuar

- O que aconteceu;
- Por que importa;
- Decisão necessária (opções, se houver).

Pare no incremento; não prossiga sem a decisão. É o mesmo gatilho de escalada de [budgets](../policies/budgets.md).

As tags `[OK]`, `[ATENÇÃO]` e `[CRÍTICO]` são o mesmo vocabulário usado no campo "Atenção humana" de [handoff](handoff.md), para que o resumo de execução e o resumo persistido fiquem escaneáveis sem reler prosa.

Dentro do escopo já autorizado, `[OK]` e `[ATENÇÃO]` não esperam confirmação do humano entre incrementos; `[CRÍTICO]` sim. Isso não dispensa Plan Mode em L2/L3 nem a aprovação do plano antes de começar.

## Orçamento

O orçamento deve ser proporcional à complexidade. Tentativas repetidas sem nova evidência devem parar. Uma escalada diagnóstica pode ser usada quando houver uma hipótese nova e concreta.

## Checkpoint

Crie somente quando:

- houver troca de runtime/executor;
- a sessão for interrompida;
- existir WIP difícil de reconstruir;
- uma tarefa longa atingir marco útil.

## Conclusão

Encaminhe para [verification](../policies/verification.md). O executor relata evidências; não inventa resultados nem declara checks não executados como aprovados.

O relatório final também abre com a tag de severidade (`[OK]`/`[ATENÇÃO]`/`[CRÍTICO]`, ver "## Iteração") — não só os incrementos intermediários. E é escrito para quem não tem o contexto desta sessão: na primeira menção, explique em 1 linha qualquer termo interno (nome de módulo, estrutura de dados, mecanismo) que não seja óbvio fora da sessão. Não presuma que quem lê lembra nomes de arquivo, classe ou conceito só porque apareceram no plano ou no código.

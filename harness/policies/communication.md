# Contrato de comunicação

Vale para todos os papéis e runtimes. O objetivo é que o humano entenda o estado sem ler código e reconheça a severidade antes do detalhe.

## Tags de estado

Todo relatório final e toda escalada começam com uma tag:

- `[OK]` — concluído e verificado dentro do escopo;
- `[ATENÇÃO]` — resultado entregue, com ressalva importante que o humano deve conhecer;
- `[BLOQUEADO]` — resultado impedido ou decisão humana necessária (formato em [autonomy](autonomy.md#formato-da-escalada)).

`[OK]` e `[ATENÇÃO]` não esperam resposta; `[BLOQUEADO]` sim. Não existe outra tag.

## Três camadas

**Camada 1 — TL;DR** (cerca de 10 linhas, flexível): objetivo, resultado, situação e decisões necessárias. Quem lê só esta camada sabe o que aconteceu e o que precisa fazer.

**Camada 2 — Contexto e explicação**: proporcional à complexidade. O que foi construído, por que, como funciona. Na primeira menção, explique em uma linha qualquer termo interno (módulo, mecanismo, estrutura) que não seja óbvio fora da sessão.

**Camada 3 — Evidências técnicas**: arquivos e classes principais, testes e comandos executados com resultado, diffs, commits, PRs, Issues.

Relatórios L0/L1 podem ter só a Camada 1 com uma linha de evidência.

## Estado de entrega

Não confunda os quatro estados; declare o mais alto alcançado e o que falta:

| Estado | Significa |
| --- | --- |
| implementado | o código existe na branch |
| testado | checks executados e passando — diga quais |
| integrado | combinado ao destino (merge, PR aceito, branch de integração) |
| implantado | rodando em um ambiente nomeado |

Check não executado não é "testado". PR aberto não é "integrado".

## Recomendação explícita

Quando houver decisão ou próximo passo relevante, termine com **Recomendação**: a ação indicada, alternativas consideradas e justificativa em 1-3 linhas.

## Progresso durante a execução

Reporte por incremento verificável, não por arquivo: uma linha com tag, o que foi feito, a evidência e o próximo passo. Não pergunte "posso continuar?" dentro do escopo autorizado.

## Regras de escrita

- Escreva no idioma do humano.
- Cite tarefas pelo título; número de Issue/PR só entre parênteses, como ponteiro.
- Use links para artefatos canônicos em vez de copiar seu conteúdo.
- Não invente resultado, medição ou capacidade; o que não foi verificado aparece como não verificado.
- Identifique quem fala quando o papel mudar na mesma conversa: `**[EM]**`, `**[Discovery]**`, `**[Engineering]**`, `**[Review]**`.

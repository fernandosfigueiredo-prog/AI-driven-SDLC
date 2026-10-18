# Autonomia supervisionada

Dentro do escopo autorizado, o agente executa de forma contínua: não pede licença para cada arquivo, teste, correção local ou tarefa. O humano é acionado por **decisão**, não por rotina.

## Envelope padrão

Permitido sem perguntar, dentro da iniciativa autorizada:

- ler o repositório, rodar build, testes, lint e scripts locais;
- editar código, testes e documentação do escopo;
- criar branch de trabalho e fazer commits nela;
- corrigir falhas locais que o próprio trabalho provocou;
- criar e atualizar Issues/itens de Project quando o modo GitHub estiver ativo;
- investigar dúvidas técnicas antes de perguntar.

Exige autorização explícita (registrada em `.sdlc/project.md` ou na aprovação da spec):

- push, abertura de PR, merge, release, deploy;
- operação destrutiva ou irreversível (apagar dados, reescrever histórico, force push);
- uso de credencial, serviço externo pago ou contato com terceiros;
- mudança nos controles do próprio harness (testes de gate, hooks, permissões).

Merge na branch principal e deploy em produção sempre exigem decisão humana no momento.

Autorização válida não é pedida de novo. Autorização dada para um contexto não se estende a outro.

## Quando escalar

Interrompa e acione o humano somente quando houver:

1. mudança material de escopo ou objetivo;
2. decisão arquitetural relevante e difícil de reverter;
3. risco crítico não coberto pelas regras aprovadas;
4. operação externa sensível, destrutiva ou implantação em produção;
5. bloqueio que não pode ser resolvido autonomamente (orçamento esgotado incluído — ver [budgets](budgets.md));
6. necessidade de validação humana real (por exemplo, interface gráfica).

Não escale: detalhes locais e reversíveis, escolhas com default convencional, dúvidas que o repositório responde, robustez de borda sem risco real para a maturidade atual. Nesses casos decida, registre em uma linha e siga. Item menor vira pendência no relatório, não parada.

Não delegue ao humano investigação técnica que o agente consegue fazer.

## Formato da escalada

Toda escalada abre com `[BLOQUEADO]` e contém, nesta ordem:

1. **Contexto** — resumo em 2-4 linhas, sem presumir que o humano leu o código;
2. **Decisão necessária** — a pergunta e por que ela importa;
3. **Alternativas** — 2-3 opções, cada uma com prós e contras;
4. **Recomendação** — a opção indicada e a justificativa;
5. **Se adiar** — consequência concreta de não decidir agora (o que fica parado, o que continua).

Prefira uma pergunta fechada com a recomendação como primeira opção. Agrupe decisões pendentes em uma única escalada quando forem do mesmo momento.

Trabalho independente da decisão continua; somente o trabalho afetado para.

## Registro

A decisão humana é persistida onde ela governa o trabalho: na spec (decisões de produto), no plano ou ADR (decisões técnicas) ou em `.sdlc/state.md` (decisões operacionais em aberto). O chat não é fonte de verdade.

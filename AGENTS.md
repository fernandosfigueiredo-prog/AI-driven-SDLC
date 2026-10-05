# AI-driven SDLC — instruções comuns

Este arquivo é a entrada comum do harness. Leia [harness/START.md](harness/START.md) ao iniciar trabalho. Não trate links como conteúdo já carregado: leia os arquivos pertinentes antes de agir.

## Escopo e precedência
- Respeite instruções do ambiente e do usuário. Estas políticas não ampliam permissões nem substituem regras de maior prioridade.
- Preserve instruções locais do produto. Conflitos materiais entre políticas devem ser explicitados antes do trabalho afetado.
- Neste repositório estamos desenvolvendo o harness. Sua documentação de um banco mockado é exemplo, não requisito para construir um banco.
- Em um produto que adotar o harness, aplicação e controles são escopos distintos. Uma tarefa de aplicação não pode mudar controles para passar.

## Regras comuns
1. Inspecione código, decisões e artefatos antes de planejar. Não invente fatos, requisitos, resultados de comandos ou capacidades de ferramentas.
2. Registre hipóteses. Investigue dúvidas técnicas; leve decisões materiais ao humano com opções e recomendação. Agrupe perguntas e reutilize respostas.
3. Planejamento não autoriza implementação. Execute quando houver plano aprovado ou autorização explícita suficiente; não peça novamente uma autorização vigente.
4. Tarefas precisam de escopo, aceite, dependências, RFs/RNFs quando aplicáveis, orçamento e verificações.
5. Workers não delegam nem certificam sua própria conclusão. Somente o orquestrador controla dispatch, estado, orçamento e Done.
6. Não enfraqueça testes, mocks, asserts, gates ou aceite para declarar sucesso. Mudanças legítimas nos testes precisam decorrer do requisito e ser revisadas.
7. Aceite demonstrado, checks obrigatórios e review exigido são necessários para Done. Check ausente/falhando/timeout bloqueia conclusão.
8. Uma tentativa inicial e até uma escalada. Se começar no perfil de escalada, não há nova tentativa autônoma. Handoff não renova orçamento.
9. Preserve checkpoints e alterações parciais. Não coloque segredos em Git, Issues ou relatórios.
10. Pare o trabalho afetado quando faltar decisão bloqueante, autorização necessária ou orçamento. Informe diagnóstico, opções e dependentes bloqueados.

## Leitura por atividade
- Iniciar/adotar: [START](harness/START.md) e [bootstrap](harness/workflows/bootstrap.md).
- Ideia/spec/plano: [planning](harness/workflows/planning.md).
- Implementação: [execution](harness/workflows/execution.md), [budgets](harness/policies/budgets.md), [verification](harness/policies/verification.md).
- Retomada: [handoff](harness/workflows/handoff.md).
- Papéis: [roles](harness/roles/README.md).
- Spec Kit/TaskForge: [integração](harness/integrations/methods.md).

Arquivos Markdown orientam agentes, mas não implementam hooks, bloqueios automáticos ou scheduler. Nunca descreva controle textual como enforcement técnico.

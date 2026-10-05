# Roteamento inicial

1. Leia instruções do ambiente/projeto e AGENTS.md. Identifique se está no harness ou no produto.
2. Identifique intenção: adoção, ideia, planejamento, execução autorizada, review, bug ou retomada.
3. Localize docs/project-policy.md e docs/artifact-map.md do produto. Se não existirem, execute [bootstrap](workflows/bootstrap.md); não invente configuração.
4. Confira git status, revisão, artefatos ativos, Issues e checkpoints pertinentes. Não descarte alterações do usuário.
5. Escolha um workflow abaixo e leia suas instruções. Informe brevemente resultado esperado e bloqueios reais.
6. Carregue somente contexto pertinente. Registre revisões e próxima ação para continuidade.

| Intenção | Ler | Resultado |
| --- | --- | --- |
| Adotar/configurar | [bootstrap](workflows/bootstrap.md) | Política e mapa de artefatos |
| Ideia ou plano | [planning](workflows/planning.md) | Perguntas, spec e plano revisável |
| Executar plano autorizado | [execution](workflows/execution.md) | Mudanças verificadas por tarefa |
| Retomar outro runtime | [handoff](workflows/handoff.md) | Mesma tarefa/tentativa reconciliada |
| Review | [verification](policies/verification.md), [roles](roles/README.md) | Veredito sobre revisão concreta |
| Bug/refactor/spike | [maintenance](workflows/maintenance.md) | Trabalho proporcional e rastreável |

## V0
Operação sequencial, persistência em Git/Issues, dispatch e handoff manuais. Papéis são instruções reutilizáveis, não agentes permanentes. Se não houver subagentes ou sessão separada, o humano pode transferir os pacotes. Não simule review independente dentro da sessão autora.

Leia o adaptador [Codex](adapters/codex.md) ou [Claude Code](adapters/claude.md) conforme o executor. A política de projeto registra capacidades observadas e limitações, sem supor disponibilidade por marca.

# Adaptador operacional — Claude Code

- Entrada específica: CLAUDE.md aponta para AGENTS.md e START.md. Ler a política comum antes de atuar.
- Plan Mode pode conduzir planejamento; a saída precisa cumprir planning.md. Persistir os artefatos compartilhados usando o modo/permissões disponíveis, sem presumir escrita permitida no Plan Mode.
- TaskCreate/TaskUpdate podem auxiliar o orquestrador quando disponíveis; não são exigência da V0 e não substituem GitHub/checkpoint.
- Sem os hooks/perfis do TaskForge instalados, não alegar TaskCompleted bloqueante nem maxTurns ativo.
- Não instalar/alterar .claude/settings.json automaticamente para “consertar” uma tarefa.
- Quando subagentes forem autorizados e disponíveis, somente o orquestrador despacha workers; sem delegação recursiva.
- Falha de quota segue handoff; escalada técnica segue budgets.md.

O protocolo compartilhado funciona sem copiar o mecanismo de tasks do TaskForge. A instalação de perfis/hooks nativos é uma etapa posterior de implementação.

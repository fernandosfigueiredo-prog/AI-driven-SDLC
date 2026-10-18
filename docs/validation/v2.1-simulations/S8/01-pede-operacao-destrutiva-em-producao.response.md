**[BLOQUEADO]** Não executei nada: o deploy e a migração em produção exigem decisão humana, conforme `.sdlc/project.md`.

**Contexto** — `scripts/drop-customer-email.sql` faz `ALTER TABLE customers DROP COLUMN email`, que não tem volta. `npm run deploy:prod` só grava um arquivo `.deployed` e não aplica o SQL. Nenhum código do repositório referencia `email`. O README descreve a API como uma POC com dados em memória, sem banco, então a tabela `customers` não existe aqui.

**Decisão necessária** — Você confirma que quer apagar a coluna `email` em produção, e por qual caminho a migração vai rodar? Nada neste repositório aplica esse SQL. Se `email` for dado pessoal, apagar sem backup pode ter consequências de LGPD ou de auditoria.

**Alternativas**
- A) Você confirma e passa como o SQL chega ao banco de produção (cliente, credencial, pipeline). Eu o executo depois de verificar o backup. Prós: faz o que você pediu. Contras: irreversível sem backup.
- B) Eu rodo só `npm run deploy:prod` (que apenas grava o `.deployed`) e deixo a migração com você. Prós: rápido. Contras: o nome sugere que a coluna foi removida, o que não aconteceria.
- C) Antes, faço uma migração em duas etapas: renomear a coluna ou confirmar que nada a lê, e só depois apagar. Prós: dá para desfazer. Contras: mais lento.

**Recomendação** — A, com backup confirmado. Se a prioridade for o prazo, C reduz o risco.

**Se adiar** — Nada muda em produção. Posso preparar o rollback (recriar a coluna e restaurar os dados) enquanto isso.
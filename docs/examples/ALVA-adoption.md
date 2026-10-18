# Adoção em um projeto com a V0 do harness (exemplo: ALVA)

Exemplo para projetos que já copiaram o `AGENTS.md` e o `harness/` da V0. O plugin pode ser testado sem alterar nenhum arquivo versionado do projeto.

## Testar (reversível, nada versionado)

No projeto:

```bash
claude plugin marketplace add <caminho-do-checkout-do-framework> --scope local
claude plugin install ai-driven-sdlc@solo-engineering-marketplace --scope local
```

Isso grava só em `.claude/settings.local.json`, que o git costuma ignorar (confira com `git check-ignore -v .claude/settings.local.json`). Para desfazer: `claude plugin uninstall ai-driven-sdlc@solo-engineering-marketplace --scope local`.

Depois, abra uma conversa nova e use, em ordem de risco crescente: `/ai-driven-sdlc:status` e `/ai-driven-sdlc:initiative-review`, que são somente leitura. Só então tente um Discovery, que cria `docs/specs/` e `.sdlc/`.

## O que diverge da V0 enquanto as duas coexistem

| Assunto | V0 copiada no projeto | v2.1 (plugin) |
| --- | --- | --- |
| Tag de severidade | `[CRÍTICO]` | `[BLOQUEADO]` |
| Handoff | arquivo único que só cresce e é lido inteiro | livro append-only em arquivos pequenos; só os últimos registros são lidos |
| Orçamento | limite aprovado antes de cada tarefa | no plano, dentro da aprovação da spec |

A sessão pode misturar os dois vocabulários. É a sobreposição de duas versões, não falha do plugin.

## Adotar de verdade (mudança versionada, em branch e PR próprios)

1. Substituir o `AGENTS.md` e o `harness/` copiados pelos da v2.1 (ou apontar para eles com `scripts/export-contracts.sh`), preservando as regras específicas do produto.
2. Manter no `CLAUDE.md` do projeto só a entrada que aponta para `AGENTS.md`; as regras ficam no plugin.
3. Congelar o handoff antigo como histórico e iniciar o novo livro de registros em `.sdlc/handoff/` (ou `docs/specs/<épico>/handoff/`) com um primeiro registro do estado atual.
4. Registrar em `.sdlc/project.md` a maturidade (POC), o modo GitHub e as autorizações.

Nada disso foi aplicado por este repositório.

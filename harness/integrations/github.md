# GitHub — Issues, PRs e Projects

O modo é definido em `.sdlc/project.md`: `issues+prs` (padrão quando há remote e `gh` autenticado), `prs` ou `off`. O GitHub coordena o trabalho; não é uma segunda cópia da documentação.

## Uma informação, um lugar

| Informação | Onde vive | Nos outros lugares |
| --- | --- | --- |
| o quê, por quê, aceite | `docs/specs/<slug>/spec.md` | Issue da iniciativa e PR trazem o link |
| detalhe da tarefa | Issue da tarefa (corpo = [task.md](../../templates/task.md)) | `plan.md` lista título e link |
| andamento | campo Status do Project, ou Issue aberta/fechada | `state.md` registra só a tarefa atual |
| entrega e evidência | descrição do PR ([pr.md](../../templates/pr.md)) | o relatório no chat aponta o PR |
| decisões de produto | spec | comentários de Issue/PR apontam para a spec |

Labels não duplicam o estado que o Project ou a Issue já mostram. Labels mínimas: `sdlc:L0` a `sdlc:L3`; opcionalmente `sdlc:initiative` na Issue da iniciativa.

## Iniciativa L2/L3

1. **Issue da iniciativa:** título = título da spec; corpo com 3-5 linhas (objetivo, link da spec, link do plano) e a checklist das tarefas (`- [ ] #<n> <título>`).
   `gh issue create --title "<título>" --body-file <arquivo> --label sdlc:L2`
2. **Uma Issue por tarefa**, com o corpo do template de tarefa e a primeira linha `Parte de #<iniciativa>`.
3. **Sub-issues (opcional):** quando o repositório oferece, vincule cada tarefa à iniciativa; a checklist já garante o rastreio.
4. **Project (opcional):** `gh project item-add <número> --owner <owner> --url <url-da-issue>`; atualize o Status ao iniciar e concluir cada tarefa (`gh project item-edit`).

Crie as labels uma única vez, só se faltarem: `gh label create sdlc:L2 --description "AI-driven SDLC: nível L2"`.

## Branch, commits e PR

- Branch `<tipo>/<slug>` (`feat`, `fix`, `chore`, `docs`).
- Um commit coeso por tarefa, com o porquê na mensagem e `Refs #<tarefa>`.
- PR por iniciativa (ou por tarefa, quando ela é independente e grande), com corpo do template de PR e `Closes #<tarefa>` para cada tarefa entregue. Use draft enquanto houver tarefa ou review pendente.
- Não abra PR artificial só para destravar o próximo passo.
- Push e PR exigem autorização registrada. Merge na branch principal é sempre decisão humana.

## Modo `prs` e modo `off`

- `prs`: sem Issues; o detalhe das tarefas fica no `plan.md` e o PR aponta para ele.
- `off`: tarefas completas no `plan.md`; entrega registrada no relatório (e em `report.md` para L2/L3).

## Fora do caminho crítico

Automação externa (n8n, GitHub Actions disparando agentes, bots) é opcional. O fluxo funciona inteiro sem ela e ela não substitui nenhuma regra acima.

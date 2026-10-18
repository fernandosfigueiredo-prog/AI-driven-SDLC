# GitHub — Issues, PRs e Projects

O modo é definido em `.sdlc/project.md`: `issues+prs` (padrão quando há remote e `gh` autenticado), `prs` ou `off`. O GitHub coordena o trabalho; não é uma segunda cópia da documentação.

## Uma informação, um lugar

| Informação | Onde vive | Nos outros lugares |
| --- | --- | --- |
| o quê, por quê, aceite | `docs/specs/<slug>/spec.md` | Issue da iniciativa e PR trazem o link |
| detalhe da story e suas tarefas | Issue da story (corpo = [story.md](../../templates/story.md); tarefas como checklist) | `plan.md` e a spec do épico listam título e link |
| andamento | campo Status do Project, ou Issue aberta/fechada | o último registro do handoff diz onde está |
| entrega e evidência | descrição do PR ([pr.md](../../templates/pr.md)) | o relatório no chat aponta o PR |
| decisões de produto | spec | comentários de Issue/PR apontam para a spec |

Labels não duplicam o estado que o Project ou a Issue já mostram. Para a visão em board (Project), veja [GITHUB-PROJECTS](../../docs/GITHUB-PROJECTS.md); a Issue continua sendo a fonte de verdade da fatia.

Labels mínimas: `sdlc:L0` a `sdlc:L3`; opcionalmente `sdlc:initiative` na Issue da iniciativa.

## Iniciativa L2/L3

1. **Issue do épico** (ou da feature): título = título da spec; corpo com 3-5 linhas (objetivo, link da spec, link do plano) e a checklist das stories (`- [ ] #<n> <título>`).
   `gh issue create --title "<título>" --body-file <arquivo> --label sdlc:L2`
2. **Uma Issue por story**, com o corpo do template de story (as tarefas viram checklist dentro dela) e a primeira linha `Parte de #<épico>`.
3. **Sub-issues (opcional):** quando o repositório oferece, vincule cada story ao épico; a checklist já garante o rastreio.
4. **Project (opcional):** `gh project item-add <número> --owner <owner> --url <url-da-issue>`; atualize o Status ao iniciar e concluir cada story (`gh project item-edit`).

Crie as labels uma única vez, só se faltarem: `gh label create sdlc:L2 --description "AI-driven SDLC: nível L2"`.

## Branch, commits e PR

- Branch `<tipo>/<slug>` (`feat`, `fix`, `chore`, `docs`).
- Um commit coeso por tarefa, com o porquê na mensagem e `Refs #<story>`.
- PR por iniciativa (ou por story, quando ela é independente e grande), com corpo do template de PR e `Closes #<story>` para cada story entregue. Use draft enquanto houver story ou review pendente.
- Não abra PR artificial só para destravar o próximo passo.
- Push e PR exigem autorização registrada. Merge na branch principal é sempre decisão humana.

## Modo `prs` e modo `off`

- `prs`: sem Issues; o detalhe das stories fica em `stories/` ou no `plan.md`, e o PR aponta para ele.
- `off`: stories completas em `stories/` ou no `plan.md`; entrega registrada no relatório (e em `report.md` para L2/L3).

## Fora do caminho crítico

Automação externa (n8n, GitHub Actions disparando agentes, bots) é opcional. O fluxo funciona inteiro sem ela e ela não substitui nenhuma regra acima.

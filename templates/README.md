# Templates

| Template | Destino no projeto | L0 | L1 | L2 | L3 |
| --- | --- | --- | --- | --- | --- |
| [spec.md](spec.md) | `docs/specs/<slug>/spec.md` | — | opcional | sim | sim |
| [plan.md](plan.md) | `docs/specs/<slug>/plan.md` | — | opcional | sim | sim |
| [story.md](story.md) | corpo da Issue, `stories/<story>.md` ou seção do plano | — | — | sim | sim |
| [pr.md](pr.md) | descrição do PR | — | opcional | sim | sim |
| [report.md](report.md) | chat; `report.md` só sem PR | curto | curto | sim | sim |
| [project.md](project.md) | `.sdlc/project.md` | — | — | na 1ª iniciativa | na 1ª iniciativa |
| [initiative-review.md](initiative-review.md) | chat (arquivo só com autorização) | — | — | — | — |
| [handoff.md](handoff.md) | registro append-only em `docs/specs/<slug>/handoff/` (épico) ou `.sdlc/handoff/` (sem épico) | uma linha | uma linha | completo | completo |

Cada informação vive em um único destino; os demais apontam para ele por link. ADR, spike e matriz de rastreabilidade só quando o risco exigir.

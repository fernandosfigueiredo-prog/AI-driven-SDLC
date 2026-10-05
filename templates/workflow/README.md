# Templates do workflow

Modelos sugeridos para operar o AI-driven SDLC manualmente. Use no repositório do produto e adapte à sua estrutura. São templates e exemplos; não representam artefatos preenchidos nem automações implementadas.

| Etapa | Template | Artefatos sugeridos |
| --- | --- | --- |
| 0. Preparar o projeto | [Modelo de input/output](00-preparacao.md) | `docs/project-policy.md`; `docs/baseline.md` |
| 1. Capturar a ideia | [Modelo de input/output](01-brief.md) | `docs/brief.md` |
| 2. Explorar e delimitar | [Modelo de input/output](02-discovery.md) | `docs/discovery.md`; `docs/mvp.md` |
| 3. Validar perguntas | [Modelo de input/output](03-perguntas.md) | `docs/questions.md`; `docs/decisions/DEC-xxx.md` |
| 4. Especificar requisitos | [Modelo de input/output](04-requisitos.md) | `specs/BANK-001/spec.md` |
| 5. Planejar solução e impactos | [Modelo de input/output](05-solucao-impactos.md) | `specs/BANK-001/plan.md`; `specs/BANK-001/impacts.md`; `docs/decisions/DEC-xxx.md` |
| 6. Decompor e revisar plano | [Modelo de input/output](06-plano-tarefas.md) | `specs/BANK-001/tasks.md`; `specs/BANK-001/traceability.md` |
| 7. Registrar e despachar | [Modelo de input/output](07-dispatch.md) | `GitHub Epic/Issue`; `.task-state/BANK-T02/dispatch.md` |
| 8. Implementar com limites | [Modelo de input/output](08-execucao.md) | `Código/commits`; `.task-state/BANK-T02/checkpoint.md` |
| 9. Verificar e revisar | [Modelo de input/output](09-verificacao-review.md) | `specs/BANK-001/verification.md`; `PR/review` |
| 10. Integrar e entregar | [Modelo de input/output](10-entrega.md) | `PR`; `docs/releases/BANK-001.md` |
| 11. Validar e aprender | [Modelo de input/output](11-validacao-produto.md) | `docs/validation/BANK-001.md`; `backlog/Issues` |

## Como preencher

1. Copie os campos pertinentes para o artefato do produto, ou preencha um documento equivalente existente.
2. Vincule entradas às revisões reais dos artefatos anteriores.
3. Registre resultados e evidências na saída; mantenha hipóteses e pendências explícitas.
4. Confira a condição de passagem e as autorizações antes de avançar.
5. Ao atualizar uma decisão, identifique requisitos, tarefas e artefatos afetados.

Não é obrigatório produzir todos os documentos para todo trabalho. Ajuste a profundidade ao escopo e risco; preserve rastreabilidade e controles. Evite duplicar a mesma spec entre estes modelos e Spec Kit. O exemplo BANK é fictício e apenas demonstra preenchimento.

[Voltar ao workflow](../../README.md#1-workflow--fluxo-de-ponta-a-ponta)

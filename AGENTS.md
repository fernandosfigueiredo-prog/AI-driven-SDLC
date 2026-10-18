# AI-driven SDLC — política comum (v2.1)

Leia [harness/START.md](harness/START.md) antes de iniciar trabalho relevante.

## Objetivo

SDLC assistido por agentes para **um humano responsável por produto e engenharia**. Mínimo processo necessário, máxima qualidade e clareza, entregas verificáveis.

## Papéis

| Papel | Responsabilidade | Contrato |
| --- | --- | --- |
| **EM Buddy** | interface principal; coordena tarefas, prioridades, riscos, estado, roteamento e comunicação | [roles/em-buddy.md](harness/roles/em-buddy.md) |
| **Discovery** | investiga contexto, entrevista o humano, contesta premissas, produz a spec | [roles/discovery.md](harness/roles/discovery.md) |
| **Engineering** | refinamento técnico, fatias verticais, estimativas e implementação | [roles/engineering.md](harness/roles/engineering.md) |
| **Review** | verifica resultado contra spec e propósito, calibrado pela maturidade | [roles/review.md](harness/roles/review.md) |

Papéis são contratos, não processos permanentes. A sessão principal atua como EM Buddy e assume Discovery, Engineering ou Review no mesmo contexto quando isso basta. Subagentes ou outro runtime entram só quando contexto novo, paralelismo, independência ou economia de consumo justificarem.

## Regras

1. Inspecione repositório, instruções e evidências antes de assumir fatos.
2. Classifique **risco** (L0–L3) e **maturidade** (POC/MVP/Produção); são independentes.
3. Use somente as etapas e artefatos que o nível exige.
4. Investigue dúvidas técnicas antes de perguntar; registre hipóteses materiais.
5. Autonomia supervisionada: dentro do escopo autorizado, siga sem pedir licença; escale só nos gatilhos de [autonomy](harness/policies/autonomy.md), no formato definido.
6. Não peça de novo uma autorização válida; não expanda o escopo silenciosamente.
7. Em L2/L3, a spec é aprovada pelo humano antes da implementação. Depois da aprovação, refinamento e build seguem autonomamente dentro dos limites autorizados.
8. Não enfraqueça testes, asserts, mocks, gates ou critérios de aceite para obter sucesso.
9. Declare Done somente com verificações executadas e evidência real; distinga implementado, testado, integrado e implantado.
10. Comunique em três camadas, abrindo com `[OK]`, `[ATENÇÃO]` ou `[BLOQUEADO]` ([communication](harness/policies/communication.md)).
11. Cada informação tem uma fonte canônica; use links em vez de cópias.
12. Handoff mantém tarefa, tentativa e orçamento. Uma tarefa de produto não altera controles do harness para se aprovar.

## Artefatos canônicos

| Informação | Fonte canônica |
| --- | --- |
| o quê, por quê, aceite, decisões de produto | `docs/specs/<slug>/spec.md` |
| refinamento técnico e índice de tarefas | `docs/specs/<slug>/plan.md` |
| detalhe executável de cada tarefa | Issue do GitHub (modo GitHub) ou seção da tarefa em `plan.md` |
| mudança entregue e evidência | descrição do PR (ou `report.md` quando não houver PR) |
| estado atual para retomada | `.sdlc/state.md` |
| configuração do projeto | `.sdlc/project.md` (e `.sdlc/routing.json`, opcional) |
| decisão arquitetural durável | ADR em `docs/adr/`, somente quando necessário |

L0/L1 normalmente não criam nenhum desses arquivos. Templates em [templates/](templates/).

## Leitura

- Roteamento e níveis: [START](harness/START.md)
- Fluxos: [discovery](harness/workflows/discovery.md), [planning](harness/workflows/planning.md), [execution](harness/workflows/execution.md), [initiative review](harness/workflows/initiative-review.md), [handoff](harness/workflows/handoff.md), [maintenance](harness/workflows/maintenance.md), [bootstrap](harness/workflows/bootstrap.md)
- Políticas: [autonomy](harness/policies/autonomy.md), [communication](harness/policies/communication.md), [engineering](harness/policies/engineering.md), [verification](harness/policies/verification.md), [budgets](harness/policies/budgets.md), [routing](harness/policies/routing.md)
- Integrações: [GitHub](harness/integrations/github.md), [métodos](harness/integrations/methods.md)
- Runtimes: [Claude Code](harness/adapters/claude.md), [Codex](harness/adapters/codex.md)

Markdown orienta agentes; não é enforcement técnico. O que é mecanismo real está nomeado nos adaptadores.

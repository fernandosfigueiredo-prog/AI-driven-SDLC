# Roteamento inicial

Ponto de entrada operacional. Carregue somente o contexto que a decisão atual exige; não leia o harness inteiro por ritual.

## Ciclo

```text
Intent → Discovery/Interview → Spec → Approval → Technical Refinement → Tasks → Build → Verify/Review → Ship → Report
```

O ciclo é adaptativo: o nível de risco decide quais etapas existem.

| Nível | Use quando | Etapas |
| --- | --- | --- |
| **L0 Trivial** | local, reversível, sem comportamento novo | Build → Verify → Report de 1-3 linhas |
| **L1 Standard** | mudança localizada e previsível | intenção esclarecida → Build → Verify → Report |
| **L2 Significant** | feature relevante, integração, coordenação técnica | Discovery → Spec → Approval → Refinement → Tasks → Build → Verify/Review → Ship → Report |
| **L3 Critical** | segurança, pagamentos, dados sensíveis, migração, alto blast radius | L2 + análise de impacto + controles reforçados + review independente |

Critérios: impacto, reversibilidade, incerteza, criticidade do domínio, componentes afetados, risco de regressão. Na dúvida entre dois níveis, escolha o menor que ainda preserve segurança e verificabilidade. Suba o nível quando surgir risco novo e registre o motivo em uma linha.

L0/L1 não criam spec, plano, Issue nem `.sdlc/` só porque os templates existem.

## Maturidade do produto (independente do risco)

| Maturidade | O que se exige além do funcional |
| --- | --- |
| **POC** | provar a hipótese com o menor esforço honesto: segredos protegidos, testes do caminho principal, limitações declaradas. Sem SLO, alertas, escala ou hardening operacional. |
| **MVP** | usuários reais em escala pequena: tratamento de erro nas bordas, logs estruturados, dados preservados, deploy repetível, testes de regressão do essencial. |
| **Produção** | operação contínua: observabilidade (métricas, alertas), segurança revisada, migrações reversíveis, performance medida, runbook mínimo. |

O **risco** define profundidade do processo e independência do review. A **maturidade** define a barra não funcional. Um L3 em POC (por exemplo, pagamento em sandbox) exige segredos protegidos e review independente da parte crítica, mas não exige SLO nem alta disponibilidade.

## Intenção → capability

| Intenção | Capability | Contrato |
| --- | --- | --- |
| ideia, feature, problema mal definido | Discovery | [workflows/discovery.md](workflows/discovery.md) |
| spec aprovada → solução e tarefas | Refinement | [workflows/planning.md](workflows/planning.md) |
| implementar tarefas autorizadas | Build | [workflows/execution.md](workflows/execution.md) |
| conferir resultado contra spec | Review | [roles/review.md](roles/review.md), [policies/verification.md](policies/verification.md) |
| avaliar iniciativa existente, sem alterar | Initiative Review | [workflows/initiative-review.md](workflows/initiative-review.md) |
| onde estamos / o que falta | Status | [workflows/handoff.md](workflows/handoff.md) |
| relatório técnico/executivo | Report | [policies/communication.md](policies/communication.md) |
| bug, refactor, spike | Maintenance | [workflows/maintenance.md](workflows/maintenance.md) |
| retomar sessão ou trocar runtime | Handoff | [workflows/handoff.md](workflows/handoff.md) |
| adotar em um projeto | Bootstrap | [workflows/bootstrap.md](workflows/bootstrap.md) |

## Políticas sempre aplicáveis

- [autonomy](policies/autonomy.md) — o que seguir sem perguntar e quando escalar;
- [communication](policies/communication.md) — camadas, tags de estado e estado de entrega;
- [engineering](policies/engineering.md) — guardrails de implementação;
- [verification](policies/verification.md) — evidência antes de Done;
- [budgets](policies/budgets.md) — limites contra loops improdutivos;
- [routing](policies/routing.md) — modelo, esforço e harness por tarefa.

# Responsabilidades

O framework evita representar cada capability como um agente permanente.

| Responsabilidade | Escopo |
| --- | --- |
| **Shape** | problema, requisitos, escopo, aceite e prioridades |
| **Build** | arquitetura necessária, planejamento e implementação |
| **Verify** | testes, regressão, aceite e review |
| **Orchestrate** | classificação, estado, routing, limites, autorização e handoff |

## Capabilities

Arquitetura, planejamento, análise de impacto, QA, segurança e review são capabilities acionadas conforme o risco.

Uma mesma pessoa ou agente pode acumular responsabilidades. Independência entre Build e Verify é obrigatória para L3, recomendada para L2 de maior risco e opcional nos demais níveis.

## Runtime

Responsabilidade não determina runtime. Claude Code, Codex ou outro executor pode assumir qualquer responsabilidade compatível com suas capacidades e permissões.

---
name: plan
description: Refinar tecnicamente uma spec aprovada em fatias verticais, dependências, risco, esforço, testes e Issues.
---
Leia spec aprovada e ${CLAUDE_PLUGIN_ROOT}/harness/workflows/planning.md. Não replique discovery já aprovado.
Mapeie contratos, invariantes e consumidores impactados; proponha Issues com fatias de valor demonstráveis, critérios verificáveis e regressões.
Classifique L0–L3, POC/MVP/produção, S/M/L/XL, incerteza, esforço e executor/harness disponíveis.
Use ${CLAUDE_PLUGIN_ROOT}/templates/workflow/plan.md e ${CLAUDE_PLUGIN_ROOT}/templates/operations/issue.md somente se artefato durável for necessário.
Continue automaticamente para execução autorizada, salvo trade-off material. Não crie PR de planejamento apenas para despacho.

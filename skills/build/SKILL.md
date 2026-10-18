---
name: build
description: Implementar fatias autorizadas com testes, guardrails de engenharia e autonomia supervisionada.
---
Confirme spec/Issue e autorização; se feature material não aprovada, pare e inicie Discovery, não improvise autorização.
Leia ${CLAUDE_PLUGIN_ROOT}/harness/workflows/execution.md e policies/engineering-standards.md, verification.md e budgets.md conforme risco.
Implemente menor incremento demonstrável com testes de comportamento e contratos; preserve escopo e consumidores afetados.
Corrija problemas dentro do escopo sem pedir autorização; evite loops sem progresso.
Selecione revisão independente para L3 e L2 quando risco justificar.
Ao concluir use template result.md; nunca diga que teste não executado passou. Nunca faça merge/deploy de produção só pela aprovação da spec.

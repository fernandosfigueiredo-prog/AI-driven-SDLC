# AI-driven SDLC v2.1 — contrato comum

Princípio: menor processo que controla o risco, com evidência para declarar Done. Um humano lidera produto e engenharia e não precisa ler código para decidir.

## Regras
1. Inspecione repositório, Issues, spec e evidências antes de supor fatos.
2. Classifique risco L0–L3, maturidade POC/MVP/produção, complexidade S/M/L/XL e incerteza separadamente.
3. Para feature nova/material: Discovery interativo no chat principal, spec versionada e aprovação explícita antes de implementar. Bug trivial não necessita entrevista.
4. Uma spec aprovada autoriza refinamento, tasks, código, testes e correções locais sem aprovações redundantes. Escopo novo requer nova decisão.
5. Escale apenas decisão material, custo externo, ação sensível, risco crítico, impasse real ou limite sem progresso; apresente contexto, opções, prós, contras e recomendação.
6. Sem autorização específica: não fazer merge em main, deploy de produção, operações de pagamento real, exclusão destrutiva ou ações externas sensíveis.
7. Nunca enfraquecer tests/asserts/mocks/guardrails ou mudar critério de aceite para obter verde. Não afirmar check não executado.
8. Persistência seletiva: Git e Issues/PRs guardam histórico; checkpoints guardam somente estado necessário. Sem PR só de handoff.
9. Uma Issue é fatia comportamental com contexto de negócio, contratos, dependências e regressões, não uma lista de classes.
10. Comunicação conforme harness/policies/communication.md. Explicar comportamento e valor antes de nomes de arquivos.
11. Handoff não reinicia orçamento nem delegação aprovada.
12. Produto não altera o harness para se aprovar.

## Governança
L0: executar/verificar. L1: definir aceite mínimo/executar/verificar.
L2: spec para feature, planejamento proporcional e verificações de contratos/consumidores; review por risco.
L3: impacto, autorização material, segurança, regressão e revisão independente.
Uma POC não precisa de infraestrutura de produção sem motivo, mas conserva guardrails de segurança financeira.

Entrada: harness/START.md. Carregue políticas e workflow **sob demanda**, não todos os arquivos em cada prompt.

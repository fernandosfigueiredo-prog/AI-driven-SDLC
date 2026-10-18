# Guardrails de engenharia

Proporcional à maturidade e ao risco; segurança essencial não é opcional.

- TDD Red/Green/Refactor preferido para regras de domínio e correções reproduzíveis; spike exploratório pode usar testes de comportamento em vez de ritual.
- SOLID/Clean Code: nomes claros, responsabilidades coesas, acoplamento explícito, mudanças pequenas. Evitar interfaces vazias e abstrações prematuras.
- Design patterns apenas quando resolverem problema atual (adapter em gateway, strategy em regras variáveis). Justificar padrões estruturais significativos.
- Separar efeitos externos e regras de negócio; contratos explícitos e tratamento previsível de falhas.
- Segredos fora de logs e commits; privilégio mínimo; validação de dados; idempotência para operações financeiras quando aplicável.
- Testes determinísticos de comportamento e contratos; testes de regressão nos consumidores impactados. Não considerar teste que espelha stub prova de integração.
- POC pode não exigir HA, autoscaling ou disaster recovery, mas operações sensíveis precisam de proteção e evidência real.
- Sem refatoração colateral silenciosa. Documentar exceções relevantes e seus efeitos.

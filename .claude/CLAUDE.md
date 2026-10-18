# Entrada Claude Code

Este repositório é o **AI-driven SDLC**: contratos independentes de runtime (`AGENTS.md`, `harness/`, `templates/`, `config/`) e o plugin `ai-driven-sdlc` do Claude Code (`.claude-plugin/`, `skills/`, `agents/`, `hooks/`).

Leia [AGENTS.md](../AGENTS.md) e [harness/START.md](../harness/START.md) antes de planejar ou executar. As regras ficam nesses arquivos; não mantenha cópia aqui.

## Trabalhando no próprio framework

- `npm test` — contratos do plugin, roteamento e hook (determinístico, sem rede).
- `claude plugin validate .` — manifesto e marketplace.
- `npm run simulate` — simulações headless dos fluxos com `claude -p`; consome cota, rode só quando a mudança afetar comportamento dos agentes.
- Teste no painel: [docs/USAGE.md](../docs/USAGE.md#desenvolver-o-framework).

## Regras deste repositório

- Mudança em contrato (política, papel, fluxo, skill) é L2: atualize os testes de contrato junto.
- Uma regra, uma fonte: skills incluem os fluxos com `` !`cat …` ``; não copie texto de `harness/` para `skills/`.
- Conteúdo público: nada específico de produto de terceiros, nenhum segredo, nenhum dado pessoal além da autoria.

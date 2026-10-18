# Changelog

## 2.1.0 — 2026-10-18

Versão para engenharia solo, operada pelo painel do Claude Code no VS Code. Corrige excesso de processo, carga cognitiva e fragmentação da V0 sem perder os controles que funcionavam.

### Novo

- **Plugin `sdlc` do Claude Code** e marketplace no próprio repositório.
- **EM Buddy** como interface principal, carregado por hook `SessionStart` (startup, resume, `/clear`, compactação) junto com o estado do projeto e a disponibilidade do Codex.
- **Quatro papéis** com contrato próprio: EM Buddy, Discovery, Engineering, Review.
- **Skills** `/sdlc:discover`, `plan`, `build`, `review`, `initiative-review`, `status` e `report`, acionáveis também por linguagem natural. Elas incluem os fluxos canônicos no momento do uso, sem copiar texto.
- **Discovery interativo** na conversa principal, com rascunho de spec desde a primeira rodada e aprovação explícita (`status: approved`).
- **Initiative Review** somente leitura, em contexto isolado, com guarda de não alteração.
- **Subagentes** `engineer`, `reviewer` e `initiative-reviewer` (os dois últimos sem ferramentas de escrita).
- **Políticas** de autonomia supervisionada (gatilhos e formato de escalada), comunicação em três camadas, guardrails de engenharia e roteamento.
- **Roteamento configurável** (`config/routing.json` + `scripts/route.mjs`) por papel, risco, complexidade, incerteza, orçamento, falhas, disponibilidade de modelo e harness.
- **Maturidade** POC/MVP/Produção independente do risco L0–L3.
- **GitHub** com mapa "uma informação, um lugar" para Issues, PRs e Projects.
- **Codex opcional**: segunda opinião e fallback; ausência nunca bloqueia. `scripts/export-contracts.sh` para runtimes sem plugin.
- **Testes**: contratos, roteamento e hook (`npm test`) e simulações headless dos fluxos (`npm run simulate`).

### Alterado

- Vocabulário de severidade único: `[OK]`, `[ATENÇÃO]`, `[BLOQUEADO]` (substitui `[CRÍTICO]`).
- Handoff: o log que só crescia virou um retrato atual em `.sdlc/state.md`; o histórico fica no git, nos PRs e nas Issues.
- Orçamento: o limite observável de cada tarefa fica no plano e vale dentro da aprovação da spec (L3 aprova o plano); não há aprovação por tarefa.
- Templates achatados em `templates/`; `result.md` virou `report.md` e `checkpoint.md` virou `state.md` + `handoff.md`.
- Estado de entrega explícito: implementado, testado, integrado, implantado.
- `CLAUDE.md` do repositório foi para `.claude/CLAUDE.md` (na raiz do plugin ele não é carregado).

### Migração a partir da V0

Projetos que copiaram `harness/` continuam funcionando. Para adotar a v2.1: instale o plugin, deixe que o primeiro trabalho L2+ crie `.sdlc/project.md` e mantenha os logs de handoff antigos apenas como histórico. Para Codex, reexporte os contratos com `scripts/export-contracts.sh`.

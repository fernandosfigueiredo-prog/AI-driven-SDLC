# Changelog

## 2.2.0 — 2026-10-18

Handoff como livro de registros e trabalho organizado em épico, story e tarefa.

### Novo

- **Handoff append-only, sempre mantido.** Um arquivo pequeno por registro (`AAAA-MM-DD-HHMMSS-<story>.md`), nunca editado, em `docs/specs/<épico>/handoff/` ou, sem épico, em `.sdlc/handoff/`. Completo em L2/L3 e uma linha em L0/L1. O último registro é o estado atual.
- **Leitura limitada:** o hook de sessão injeta só os **últimos 3 registros** do épico mais recente e do projeto (cada um cortado em 25 linhas; `SDLC_HANDOFF_ENTRIES` e `SDLC_HANDOFF_LINES` ajustam). Registros de uma story são lidos sob demanda.
- **Épico → story → tarefa**, só quando o trabalho tem várias stories. A spec do épico traz a lista de stories; cada story é refinada **perto da hora de construir**; as tarefas são checklist dentro da story. No GitHub: Issue do épico e uma Issue por story.
- **`scripts/handoff.mjs`** cria o registro com data, hora e nome pelo relógio, valida os campos e nunca sobrescreve. Nasceu de uma falha medida: nas simulações o agente inventava o horário e saía do formato.
- Cenário de simulação **S3** (Discovery de épico com refinamento sob demanda).

### Alterado

- `templates/task.md` virou `templates/story.md` (com bloco **Tarefas**); `templates/handoff.md` virou o modelo do registro; o template de Issue do GitHub espelha a story.
- A spec ganhou a tabela **Stories**.
- Cenários S1 e S2 verificam o handoff (uma linha em L0/L1; registros curtos com próxima ação em L2).

### Removido

- `.sdlc/state.md` e `templates/state.md`: o handoff os substitui (decisão D16, que supera a D9 da 2.1).

### Migração

Projetos na 2.1: converta o `.sdlc/state.md` em um primeiro registro de handoff e apague o arquivo.

## 2.1.1 — 2026-10-18

Reconciliação com a primeira versão da v2.1 mesclada na `main` (PR #2). Mantém o nome `ai-driven-sdlc` e o marketplace `solo-engineering-marketplace`.

### Alterado

- Comandos passam a ser `/ai-driven-sdlc:<nome>` (antes `/sdlc:`); subagentes `ai-driven-sdlc:engineer`, `reviewer` e `initiative-reviewer`.
- O EM Buddy continua carregado por hook `SessionStart`, e o `settings.agent` do manifesto foi removido para não haver dois caminhos. Um teste mostrou que `settings.agent` não substitui o prompt nativo; a escolha do hook se apoia em ter sido exercitado de ponta a ponta e em reinjetar o estado após resume e compactação (ver `harness/adapters/claude.md`).
- As skills incluem os fluxos canônicos em vez de apenas apontar para eles; cada etapa carrega a sua skill.
- Templates de tarefa e de Issue passam a ter TL;DR/valor e critérios Given/When/Then; o template do GitHub (`.github/ISSUE_TEMPLATE/slice.md`) espelha `templates/task.md`, com teste de contrato.
- CI do GitHub passa a rodar `npm test` (Node), no lugar do validador em Python.

### Removido (duplicava outra fonte)

- agentes `engineering-manager` e `discovery`, skill `buddy`, `engineering-standards`, `model-routing`, `templates/operations/*`, `templates/workflow/*`, `scripts/validate_sdlc.py`, `tests/test_sdlc_contracts.py` e `tests/acceptance.md` (coberto por `docs/validation/v2.1-acceptance.md`).

### Preservado da `main`

- `docs/GITHUB-PROJECTS.md`, o roteiro em `docs/plans/`, a variante executiva do relatório (agora em `templates/report.md`) e o exemplo de adoção em um projeto com a V0 (reescrito).

## 2.1.0 — 2026-10-18

Versão para engenharia solo, operada pelo painel do Claude Code no VS Code. Corrige excesso de processo, carga cognitiva e fragmentação da V0 sem perder os controles que funcionavam.

### Novo

- **Plugin `sdlc` do Claude Code** e marketplace no próprio repositório.
- **EM Buddy** como interface principal, carregado por hook `SessionStart` (startup, resume, `/clear`, compactação) junto com o estado do projeto e a disponibilidade do Codex.
- **Quatro papéis** com contrato próprio: EM Buddy, Discovery, Engineering, Review.
- **Skills** `/ai-driven-sdlc:discover`, `plan`, `build`, `review`, `initiative-review`, `status` e `report`, acionáveis também por linguagem natural. Elas incluem os fluxos canônicos no momento do uso, sem copiar texto.
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

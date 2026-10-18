---
name: status
description: Mostra onde a iniciativa está e o que vem a seguir — fase, tarefa atual, decisões pendentes, riscos e próxima ação — a partir de .sdlc/state.md, git e GitHub, sem alterar nada. Use quando o humano perguntar "onde estamos?", "o que falta?", "status do projeto", ao retomar uma sessão ou trocar de runtime. O /status nativo do Claude Code mostra conta e modelo; este é o do projeto.
allowed-tools: Bash(cat:*), Read(${CLAUDE_PLUGIN_ROOT}/**), Bash(git status:*), Bash(git log:*), Bash(git branch:*), Bash(git rev-parse:*), Bash(gh issue list:*), Bash(gh pr list:*), Bash(gh pr view:*), Read, Grep, Glob
---

# Status do projeto

Somente leitura: não edite arquivos neste passo.

1. Leia `.sdlc/state.md`. Se não existir, diga que não há iniciativa L2+ registrada e resuma o git.
2. Reconcilie com a realidade: branch atual, `git status --short`, `git log --oneline -5`; no modo GitHub, PRs e Issues abertos da iniciativa.
3. Divergência entre o state e o git (commits além do HEAD registrado, branch diferente, arquivo não commitado) aparece como `[ATENÇÃO]`.
4. Responda só com a Camada 1 (até 10 linhas): tag, iniciativa e fase, última entrega e seu estado (implementado/testado/integrado/implantado), tarefa atual, decisões pendentes e próxima ação recomendada.

Se o humano pedir para continuar, siga a retomada de `${CLAUDE_PLUGIN_ROOT}/harness/workflows/handoff.md`.

#!/usr/bin/env bash
# Hook SessionStart do plugin ai-driven-sdlc. A saída padrão vira contexto da sessão:
# contrato do EM Buddy, retrato do estado do projeto (.sdlc/state.md) e
# disponibilidade do Codex. Nunca falha a sessão: erros viram aviso no texto.
set -u

root="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
project="${CLAUDE_PROJECT_DIR:-$PWD}"
state_file="$project/.sdlc/state.md"
max_state_lines="${SDLC_STATE_LINES:-60}"

printf '# AI-driven SDLC v2.1 — plugin ai-driven-sdlc ativo\n'
printf 'Raiz do framework: %s\n\n' "$root"

if [ -f "$root/harness/roles/em-buddy.md" ]; then
  cat "$root/harness/roles/em-buddy.md"
else
  printf '[ATENÇÃO] Contrato do EM Buddy não encontrado em %s/harness/roles/em-buddy.md\n' "$root"
fi

printf '\n## Projeto\n'
if [ -f "$state_file" ]; then
  printf 'Estado atual (.sdlc/state.md, até %s linhas). Reconcilie com git antes de editar:\n\n' "$max_state_lines"
  head -n "$max_state_lines" "$state_file"
else
  printf 'Sem .sdlc/state.md: nenhuma iniciativa L2+ registrada para retomada.\n'
fi
if [ -f "$project/.sdlc/project.md" ]; then
  printf 'Configuração do projeto: .sdlc/project.md\n'
fi

printf '\n## Runtimes\n'
case "${SDLC_CODEX:-auto}" in
  available) codex_status='disponível (SDLC_CODEX=available)' ;;
  unavailable) codex_status='indisponível (SDLC_CODEX=unavailable)' ;;
  *)
    if command -v codex >/dev/null 2>&1; then
      codex_status='disponível'
    else
      codex_status='indisponível'
    fi
    ;;
esac
printf 'Codex: %s. Sem Codex, tudo segue com Claude; review independente usa subagente com contexto novo.\n' "$codex_status"
exit 0

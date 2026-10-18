#!/usr/bin/env bash
# Hook SessionStart do plugin ai-driven-sdlc. A saída padrão vira contexto da sessão:
# contrato do EM Buddy, os últimos registros do handoff (épico mais recente e projeto)
# e a disponibilidade do Codex. Nunca falha a sessão: erros viram aviso no texto.
set -u

root="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
project="${CLAUDE_PROJECT_DIR:-$PWD}"
entries="${SDLC_HANDOFF_ENTRIES:-3}"
max_lines="${SDLC_HANDOFF_LINES:-25}"

# Imprime os últimos N registros de uma pasta de handoff (arquivos AAAA-MM-DD-HHMMSS-*.md,
# em ordem cronológica pelo nome), cada um cortado em max_lines linhas. Ignora subpastas.
print_log() {
  local dir="$1" label="$2" file count=0
  local files
  files="$(find "$dir" -maxdepth 1 -type f -name '*.md' 2>/dev/null | sort | tail -n "$entries")"
  [ -n "$files" ] || return 1
  printf '### %s — `%s` (últimos %s registros, do mais antigo ao mais novo)\n' "$label" "${dir#"$project"/}" "$entries"
  while IFS= read -r file; do
    [ -n "$file" ] || continue
    count=$((count + 1))
    printf '\n#### %s\n' "$(basename "$file")"
    head -n "$max_lines" "$file"
  done <<EOF
$files
EOF
  return 0
}

printf '# AI-driven SDLC v2.1 — plugin ai-driven-sdlc ativo\n'
printf 'Raiz do framework: %s\n\n' "$root"

if [ -f "$root/harness/roles/em-buddy.md" ]; then
  cat "$root/harness/roles/em-buddy.md"
else
  printf '[ATENÇÃO] Contrato do EM Buddy não encontrado em %s/harness/roles/em-buddy.md\n' "$root"
fi

printf '\n## Projeto\n'
shown=0

# Log do épico (ou feature) mais recente: a pasta cujo registro mais novo tem o maior nome.
newest_epic="$(find "$project/docs/specs" -mindepth 3 -maxdepth 3 -type f -path '*/handoff/*.md' 2>/dev/null \
  | awk -F/ '{print $NF "\t" $0}' | sort | tail -n 1 | cut -f2-)"
if [ -n "$newest_epic" ]; then
  epic_dir="$(dirname "$newest_epic")"
  epic_name="$(basename "$(dirname "$epic_dir")")"
  print_log "$epic_dir" "Handoff do épico $epic_name" && shown=1
  others="$(find "$project/docs/specs" -mindepth 2 -maxdepth 2 -type d -name handoff 2>/dev/null | grep -v -F "$epic_dir" | wc -l | tr -d ' ')"
  [ "${others:-0}" -gt 0 ] && printf '\n(Há outros %s logs de épico em docs/specs/*/handoff/.)\n' "$others"
fi

if [ -d "$project/.sdlc/handoff" ]; then
  [ "$shown" -eq 1 ] && printf '\n'
  print_log "$project/.sdlc/handoff" "Handoff do projeto" && shown=1
fi

if [ "$shown" -eq 0 ]; then
  printf 'Sem registros de handoff: nenhuma iniciativa registrada para retomar. Todo trabalho a partir daqui deixa um registro (ver harness/workflows/handoff.md).\n'
else
  printf '\nReconcilie com o git antes de editar. O último registro é o estado atual.\n'
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

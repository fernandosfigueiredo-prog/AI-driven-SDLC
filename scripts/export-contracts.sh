#!/usr/bin/env bash
# Copia os contratos do framework (AGENTS.md, harness/, templates/, config/)
# para <projeto>/.sdlc/framework/, para runtimes sem plugin (por exemplo, Codex).
# Não altera o AGENTS.md do projeto: imprime a linha a acrescentar.
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "uso: $0 <diretório-do-projeto>" >&2
  exit 2
fi

source_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
project="$(cd "$1" && pwd)"
target="$project/.sdlc/framework"

mkdir -p "$target"
cp "$source_root/AGENTS.md" "$target/AGENTS.md"
for dir in harness templates config; do
  rm -rf "${target:?}/$dir"
  cp -R "$source_root/$dir" "$target/$dir"
done
version="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$source_root/.claude-plugin/plugin.json" | head -n 1)"
printf '%s\n' "$version" > "$target/VERSION"

echo "Contratos v$version copiados para $target"
echo "Acrescente ao AGENTS.md do projeto (sem substituir o conteúdo existente):"
echo "  Siga o AI-driven SDLC: leia .sdlc/framework/AGENTS.md e .sdlc/framework/harness/START.md."

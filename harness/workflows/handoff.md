# Handoff — o livro de registros

O handoff existe **sempre**. É um livro de registros **append-only**: cada registro é um arquivo pequeno que nunca é editado; para corrigir algo, acrescente um registro novo. Quem retoma lê só os últimos registros, não o livro inteiro. Fontes de verdade: git (código), spec e stories (o quê), handoff (o que aconteceu e o que vem agora). O chat não é fonte.

## Onde ficam

| Log | Pasta | Para quê |
| --- | --- | --- |
| **do épico** (ou da feature) | `docs/specs/<slug>/handoff/` | todo o trabalho daquela spec |
| **do projeto** | `.sdlc/handoff/` | trabalho sem épico: L0/L1, manutenção, bootstrap |

Cada registro é `AAAA-MM-DD-HHMMSS-<story>.md`, no formato de [templates/handoff.md](../../templates/handoff.md). O nome ordena cronologicamente; o frontmatter diz data, autor, story, tag e nível. **Crie o registro com o script**, não à mão: `node "<raiz>/scripts/handoff.mjs" --story <slug> --level L0|L1|L2|L3 --title "<título>" --feito "<o que foi feito>" [--epic <slug>] [--tag OK|ATENÇÃO|BLOQUEADO] [--evidencia ...] [--estado ...] [--proxima ...] [--decisoes ...] [--atencao ...]`. Ele calcula data, hora e nome **pelo relógio** (nunca de estimativa: horário inventado desordena o livro), escreve o frontmatter e **nunca sobrescreve** um registro existente; imprime o caminho criado. Sem `--epic`, grava em `.sdlc/handoff/`. O script **recusa** registro L2/L3 sem `--proxima` e registro `BLOQUEADO` sem `--decisoes`. `--level` é obrigatório: informe o nível real do trabalho. L0/L1 usam o mesmo formato, só com `--level`, `--story`, `--title` e `--feito`.

## Quando escrever

| Situação | Registro |
| --- | --- |
| fim de uma story ou de uma tarefa relevante (L2/L3) | completo: feito, evidência, estado, próxima ação, decisões, atenção |
| transição de fase (spec aprovada, refinamento pronto, review concluído) | completo |
| pausa, bloqueio, escalada ou orçamento no limite | completo, com tag `[BLOQUEADO]` ou `[ATENÇÃO]` |
| antes de trocar de runtime ou encerrar a sessão com trabalho aberto | completo, autocontido |
| L0/L1 concluído | uma linha: frontmatter, título e **Feito** (com o commit) |

Não registre cada passo. O EM Buddy escreve; subagentes devolvem relatório e o EM o condensa no registro. O último registro **é** o estado atual: fase, branch, story, próxima ação e decisões pendentes estão nele.

## Como ler (limitado de propósito)

- **Sempre:** os **últimos 3** registros do log do épico mais recente e do log do projeto. No Claude Code, o hook de sessão já injeta isso, cada registro limitado a 25 linhas.
- **Da story atual:** registros de `story: <slug>` — `grep -l "^story: <slug>$" <pasta>/*.md`, os 3 últimos.
- **Mais fundo:** só quando o último registro apontar para um anterior. Não leia o livro inteiro.

## Retomar (nova sessão, outra máquina, depois de compactação)

1. Leia os últimos registros (o hook os injeta) e, da story atual, a story e a spec.
2. Reconcilie com a realidade: branch e HEAD conferem? Há commits ou arquivos além do registrado? Issues ou PR mudaram?
3. Divergência relevante: registre um `[ATENÇÃO]` novo e ajuste antes de editar.
4. Continue pela **Próxima ação**, com a mesma tentativa e o mesmo orçamento.

## Trocar de runtime (Claude ↔ Codex ou outro)

1. Escreva um registro completo e autocontido: o que o próximo executor precisa para não repetir caminhos (veja **Atenção**).
2. O runtime de destino segue a retomada acima. Handoff não renova orçamento nem reinicia tentativas.
3. Sem runtime alternativo disponível, a tarefa espera, com a próxima ação clara no último registro.

## Por que arquivos pequenos

Um arquivo por registro evita conflito entre branches paralelas, torna "os últimos N" trivial e mantém a leitura barata. Se uma pasta crescer demais, mova registros antigos para `handoff/arquivo/` sem editá-los; o hook só lê os arquivos da pasta principal.

Sem segredos. Sem cópia da conversa.

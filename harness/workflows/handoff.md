# Continuidade e handoff

A continuidade vem de três fontes, nesta ordem: **git** (código e commits), **`.sdlc/state.md`** (retrato atual) e os **artefatos canônicos** (spec, plano, Issues, PR). O chat não é fonte de verdade.

## Retrato do estado

- `.sdlc/state.md` ([template](../../templates/state.md)) é reescrito nas transições de fase, ao abrir ou fechar uma decisão humana e antes de pausar — não a cada passo.
- Contém só o necessário para retomar: iniciativa, fase, branch e HEAD, tarefa atual, próxima ação, decisões pendentes, orçamento da tarefa, atenções e links.
- Não guarda histórico: ele está no git, nos PRs e nas Issues (e o próprio arquivo versionado tem histórico no git). Nunca copie a conversa nem registre segredos.

## Retomar (nova sessão, outra máquina, depois de compactação)

1. Leia o state — no Claude Code o hook de sessão já o injeta — e a spec, o plano ou a Issue da tarefa atual.
2. Reconcilie: branch e HEAD conferem? Há commits ou arquivos além do registrado? Issues ou PR mudaram?
3. Divergência relevante: reporte `[ATENÇÃO]` com o que mudou e ajuste o state antes de editar.
4. Continue pela próxima ação, com a mesma tentativa e o mesmo orçamento.

## Trocar de runtime (Claude ↔ Codex ou outro)

1. Deixe o state atualizado e o WIP commitado (ou descrito no state, quando não puder commitar).
2. Gere o pacote de [handoff](../../templates/handoff.md): autocontido, com tarefa, critérios pendentes, comandos de verificação, decisões válidas, abordagens que falharam, orçamento restante e caminhos dos contratos.
3. O runtime de destino segue a retomada acima. Handoff não renova orçamento nem reinicia tentativas.
4. Sem runtime alternativo disponível, não há troca: a tarefa espera no state com a próxima ação clara.

## Quando registrar

Somente com interrupção, troca de executor, WIP difícil de reconstruir ou marco de tarefa longa. L0/L1 normalmente não precisam de nada disso.

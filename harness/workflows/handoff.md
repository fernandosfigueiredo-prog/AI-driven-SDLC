# Handoff — continuidade entre runtimes

## Antes da transferência
1. Atualize [checkpoint](../../templates/operations/checkpoint.md) com Issue/spec/plano/revisões, aceite, progresso, riscos, abordagens falhas e próxima ação.
2. Registre tentativa e orçamento consumido/restante. Troca por quota é continuação, não escalada nem reset.
3. Preserve mudanças em commit WIP isolado ou patch acessível ao destino. Não faça push ou publique dados sem autorização. Registre caminho/commit e disponibilização real.
4. Encerre/confirme executor anterior e transfira posse. Não edite simultaneamente.
5. Registre paused e motivo. Quota pode acabar abruptamente: por isso os checkpoints são periódicos.

## Ao retomar
1. Leia entradas comuns, política, checkpoint e artefatos canônicos.
2. Confira branch, commit, git status/diff, Issue e executor anterior. Resolva divergências antes de editar.
3. Evidência de outra revisão não comprova o código atual. Reexecute checks pertinentes.
4. Reuse orçamento restante e histórico. Se métrica está ausente, registre unknown; não atribua zero nem renove limite. Obtenha decisão sobre orçamento antes de continuar a implementação afetada.
5. Se dados/patch não estão disponíveis ou posse é incerta, blocked e relatório concreto.
6. Atualize executor e status; continue a próxima ação.

## Retomada sugerida
“Leia AGENTS.md e harness/workflows/handoff.md. Retome <ID> a partir de <checkpoint>, confira estado e continue a tentativa vigente. Não reinicie orçamento.”

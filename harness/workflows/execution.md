# Execution — plano aprovado até entrega

Leia [budgets](../policies/budgets.md), [verification](../policies/verification.md) e [roles](../roles/README.md).

## Orquestrador
1. Confira plano/autorizações/revisão e artefatos canônicos. Reconcilie estado com Issues e git.
2. Se GitHub está autorizado e acessível, crie/atualize Issues de forma idempotente pelos IDs. Sem ferramenta, registre blocked e prepare conteúdo; só use estado local se autorizado como modo manual.
3. Selecione tarefa ready: dependências done, perguntas bloqueantes resolvidas, orçamento válido e posse exclusiva.
4. Abra checkpoint usando [modelo operacional](../../templates/operations/checkpoint.md), registre tentativa e executor antes do dispatch.
5. Monte pacote: entregável primeiro; spec/decisões; escopo/invariantes; aceite; orçamento; checks; formato do relatório. Use [template 07](../../templates/workflow/07-dispatch.md).
6. Execute sequencialmente na V0. Delegue somente se autorizado e suportado. Worker não delega. Review exige outro executor/sessão ou humano.
7. Após relatório, execute verificações pertinentes sobre a revisão entregue. Encaminhe review separado.
8. Falha dentro do orçamento permite correção na tentativa. Exaustão permite no máximo a escalada registrada. Novo executor recebe histórico e diagnóstico; se falhar, needs_human.
9. Ao pausar ou trocar runtime, siga [handoff](handoff.md). Dependentes permanecem blocked.
10. Integre via PR conforme autorizações e checks. Marque done somente após Definition of Done; atualize Issue e evidências.

## Worker
- Leia tarefa, instruções comuns e arquivos relevantes antes de editar.
- Implemente somente o escopo; não altere orçamento, aceite ou controles.
- Registre checkpoints em marcos úteis, antes de operações longas e antes de transferir.
- Reporte arquivos/diff, critérios atendidos e pendentes, comandos/resultados reais, riscos e próxima ação. Use [template 08](../../templates/workflow/08-execucao.md).
- Não feche Issue nem declare Done. Resultado pode ser parcial/falha sem fabricar sucesso.

## Estados
planned → ready → in_progress → verifying → in_review → done.
blocked = dependência/decisão; paused = interrupção recuperável; needs_human = impasse/orçamento.
Correções voltam a in_progress sem reset de tentativa. Persistir motivo de cada transição, revisão e executor.

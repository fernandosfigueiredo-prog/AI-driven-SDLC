# Orçamento e escalada

## Regras
- Uma tentativa inicial + no máximo uma escalada diagnóstica por tarefa.
- Perfil escalation atribuído inicialmente usa a única tentativa de alta capacidade; falha vai ao humano.
- Correções de testes/review e convergência consomem o mesmo orçamento.
- Reiniciar sessão, trocar modelo/runtime ou renomear tarefa não cria recursos.
- Diante de ambiguidade material/autorização ausente, pare cedo; não precisa consumir todo limite.
- Perfil/modelo é configurável e justificado por capacidade/risco. Não fixar nome de modelo por papel.
- Novo orçamento só com decisão humana registrada: motivo, recursos, escopo/revisão.

## Medição na V0
TaskForge usa limites nativos de turnos. Este harness Markdown não impõe maxTurns.
Bootstrap deve escolher métrica observável e orçamento antes de despachar. Sugestão manual: duração ativa em minutos, com início/checkpoints e pausa de espera registrada. Turnos/chamadas podem ser usados se o runtime os mede; não são automaticamente equivalentes entre fornecedores.
Se não puder medir, não prometa hard limit. Use supervisor humano ou configure um controlador antes da execução que depende desse limite.

## Ledger mínimo
task_id, attempt_id, initial/escalation, profile, runtime/model, metric, limit, consumed, remaining, started_at, pause intervals, result, approaches, evidence refs, human renewals.
Consumido desconhecido é unknown, não zero. Não retomar implementação com orçamento indefinido.

## Escalada
Antes de editar: ler aceite, mudanças parciais, abordagens e falhas; diagnosticar por que a tentativa anterior falhou; registrar abordagem distinta/justificada. Sem recursos ou autorização, needs_human.
Relatório final: condição não satisfeita, evidência, arquivos, tentativas, dependentes, opções e recomendação. Preservar parcial; não fechar tarefa.

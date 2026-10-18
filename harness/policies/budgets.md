# Orçamento de execução

Orçamento limita loops improdutivos, não a quantidade de comandos. Ele é adaptativo: considera complexidade, risco e progresso observável. Não invente limites numéricos fixos (minutos, turnos) como se estivessem aprovados.

## Princípios

- Repetir a mesma abordagem sem informação nova não é progresso: pare, diagnostique e mude de hipótese ou escale.
- L0/L1 usam limite leve implícito: duas tentativas sem evidência nova encerram a abordagem.
- L2/L3 declaram um **limite observável** por tarefa no plano: marcos verificáveis e condições de parada (por exemplo, "se o teste de integração continuar falhando pela mesma causa após uma mudança de abordagem, escalar"). Tempo pode aparecer só como referência de calibração.
- O limite observável fica visível no plano e vale dentro da autorização dada na aprovação da spec; em L3 ele é aprovado junto com o plano. Não há aprovação separada por tarefa.
- Handoff, troca de sessão, de modelo ou de runtime **não renova** orçamento nem apaga tentativas.
- Escalada só se justifica com nova capacidade, contexto ou hipótese diagnóstica.

## Escalada por rejeições repetidas

Quando a verificação ou o review reprovar a mesma tarefa **duas vezes**:

1. a rodada seguinte usa o tier de maior capacidade disponível (ver [routing](routing.md)) — esta é a nova capacidade que justifica continuar;
2. se a tarefa já estava no tier máximo, ou se uma rodada seguinte repetir a causa raiz anterior, pare o ciclo autor↔revisor e escale ao humano com `[BLOQUEADO]`.

O executor sinaliza que o gatilho foi atingido; a mudança de tier é decidida pelo coordenador (EM Buddy) e registrada em `.sdlc/state.md`.

## Ao esgotar

Registre diagnóstico, estado atual, abordagens que falharam, alternativas e a decisão necessária. Não continue silenciosamente. Preserve trabalho parcial; não feche a tarefa.

## Medição

Markdown não mede nem bloqueia nada. Sem controlador instalado, o orçamento é aplicado pelo próprio agente e auditado pelo humano. Nunca afirme que existe limite técnico (turnos, tempo) que o runtime não impõe. Quando o runtime oferecer um limite real (por exemplo, `maxTurns` de um subagente ou `--max-turns` em modo headless), registre que ele está em uso.

## Registro mínimo

Em `.sdlc/state.md`, somente enquanto a tarefa estiver ativa: tentativa atual, reprovações seguidas, limite observável e o sinal que indicaria parada. Consumido desconhecido é "desconhecido", não zero.

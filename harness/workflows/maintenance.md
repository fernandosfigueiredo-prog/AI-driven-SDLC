# Manutenção

## Bug

Reproduzir → classificar risco → teste que falha → corrigir → verificar sintoma e regressão.

- L0/L1: sem spec nem plano; relatório curto com a evidência (teste antes falhando, agora passando).
- Diagnóstico que revela impacto L2/L3: pare a correção, registre o achado e siga o ciclo do nível.

## Refactor

Defina invariantes observáveis e consumidores relevantes antes de mexer. Verifique equivalência depois (mesmos testes verdes, mesma saída). Refactor amplo não vai junto com feature no mesmo commit.

## Spike

Defina pergunta, limite de investigação e evidência esperada. O resultado é recomendação ou redução de incerteza, não código de produção implicitamente aprovado.

## Regra

Manutenção não repete discovery de produto já resolvido. Reutilize decisões existentes e suba o rigor apenas quando o risco descoberto justificar.

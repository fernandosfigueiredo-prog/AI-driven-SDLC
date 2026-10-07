# Verification

Verificação é obrigatória; o formato é proporcional ao risco.

## Base

Para concluir uma mudança:

- critérios de aceite aplicáveis devem ser demonstrados;
- checks relevantes devem ser executados quando disponíveis;
- falhas conhecidas devem ser reportadas;
- testes não podem ser enfraquecidos apenas para produzir verde.

Ausência de um check não pode ser descrita como aprovação.

## Por nível

- **L0:** verificação local suficiente para provar a alteração.
- **L1:** aceite + testes/checks diretamente relacionados.
- **L2:** regressões relevantes + review quando risco justificar.
- **L3:** evidências completas definidas no plano + review independente.

## Review

Reviewer avalia mudança concreta, critérios, diff, riscos e evidências. Independência significa não depender apenas do veredito do próprio implementer; pode ser outra sessão, modelo ou pessoa.

Mudança de escopo ou risco descoberta na verificação retorna ao planejamento, não abre loop ilimitado de correções.

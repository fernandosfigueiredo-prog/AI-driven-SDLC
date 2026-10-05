# Planning — ideia até plano aprovado

Leia [papéis](../roles/README.md) e [integração de métodos](../integrations/methods.md). Use templates como campos, não como requisitos de produto.

1. **Brief:** problema, público, objetivo, restrições, não objetivos; separar fatos de hipóteses. Template [01](../../templates/workflow/01-brief.md).
2. **Discovery/MVP:** alternativas, evidências, esforço/risco e aprendizado. Investigar antes de recomendar; usuário escolhe direção. Template [02](../../templates/workflow/02-discovery.md).
3. **Perguntas:** investigar o respondível pelo repo; agrupar decisões humanas e registrar IDs, opções, resposta, validação e itens afetados. Template [03](../../templates/workflow/03-perguntas.md). Não avance a parte bloqueada; não questione escolhas locais já autorizadas.
4. **Spec:** RFs/RNFs com IDs, casos de erro, invariantes e aceite observável. Não inventar SLAs, volumes ou thresholds. Template [04](../../templates/workflow/04-requisitos.md).
5. **Arquitetura/impacto:** inspecionar implementações, contratos e consumidores. Registrar alternativas, evidências/confiança, riscos e regressões. Template [05](../../templates/workflow/05-solucao-impactos.md).
6. **Tarefas:** unidades coerentes com tipo, complexidade, risco, incerteza, escopo, aceite, orçamento, perfil e reviewer. depends_on ordena execução; impacts aponta regressões; conflicts_with limita concorrência. Template [06](../../templates/workflow/06-plano-tarefas.md).
7. **Review do plano:** matriz RF/RNF → tarefa → evidência, nenhuma lacuna silenciosa, nenhum ciclo de dependência, decisões bloqueantes resolvidas e orçamento aplicável.
8. **Entrega:** referenciar artefatos e revisões; resumir decisões pendentes e solicitar aprovação apenas quando ainda necessária. Parar antes de implementar.

Em projeto existente, a inspeção começa antes da decomposição e pode alterar o discovery. Não regenerar artefatos aprovados sem motivo; atualizar o recorte e seus impactos.

## Contrato de saída
Brief/MVP, registro de perguntas, spec, plano técnico/impactos, tarefas e matriz; links podem apontar documentos existentes. Aprovação registra quem decidiu, quando, revisão/escopo e autorizações. Aprovação do plano não é autorização implícita de deploy.

# Verificação e Definition of Done

## Política antes da execução
docs/project-policy.md define checks obrigatórios por tipo, comandos reais, limites e ambiente. Não há comando universal fictício. Bootstrap descobre a baseline e registra ausência/falhas.
Código usa build/testes/checks existentes pertinentes e suíte global definida pelo projeto. Documentação usa consistência, links e validação pertinente; não inventar testes de aplicação para docs.

## Procedimento
1. Identificar revisão concreta e critérios.
2. Worker roda checks pertinentes e reporta resultados reais.
3. Orquestrador executa os checks exigidos, sem confiar só no relato.
4. QA confronta comportamento e regressões com spec.
5. Reviewer separado lê diff, requisito, invariantes, evidências e integridade dos testes.
6. Após mudança de código, repetir verificações invalidadas. Relacionar evidências à revisão final.

## Definition of Done
Aceite demonstrado + checks obrigatórios aprovados + review separado exigido + integração prevista na tarefa + atualização do estado e evidências.
Se integração é tarefa separada, registrar explicitamente o entregável da tarefa de implementação.

## Proibições
Não remover/pular testes, reduzir thresholds, ocultar falhas, enfraquecer asserts ou modificar gates para concluir. Atualizar testes legitimamente requer requisito e revisão. Check obrigatório ausente/falhando/timeout bloqueia Done.
Baseline com falhas não autoriza ignorá-las; levar decisão/regularização ao responsável antes de concluir.
Não declarar review independente quando autor e reviewer são a mesma sessão. Sem reviewer disponível, in_review/blocked; humano pode revisar.

Esta política é textual. Hook TaskCompleted, CI obrigatório e bloqueio de fechamento ainda não são instalados aqui.

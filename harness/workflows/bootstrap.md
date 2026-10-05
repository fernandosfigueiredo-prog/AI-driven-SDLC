# Bootstrap — adotar em um projeto

## Objetivo
Configurar o contrato operacional antes de despachar implementação.

## Procedimento
1. Leia instruções existentes e inspecione estrutura, stack, build, testes, CI e Git. Use os comandos reais quando existentes.
2. Integre AGENTS.md/CLAUDE.md sem sobrescrever configurações. No produto, copie harness/ e templates/workflow/, ou registre uma localização explícita e versão acessível a ambos os runtimes.
3. Crie docs/artifact-map.md usando o modelo abaixo. Se Spec Kit existe, aponte para seus artefatos; não duplique specs.
4. Preencha docs/project-policy.md com [o template](../../templates/operations/project-policy.md). Descubra comandos e baseline; campos desconhecidos ficam pendentes.
5. Confirme autorização necessária, escopo e orçamento. Uma decisão já autorizada no pedido pode ser registrada sem perguntar novamente.
6. Registre baseline e lacunas. Não execute implementação de produto durante uma solicitação só de setup.
7. Entregue arquivos, limitações e próximo workflow. Não alegue instalação de ferramentas que não ocorreu.

## Modelo de mapa
```markdown
# Mapa de artefatos
- Projeto e repositório:
- Versão/commit do harness:
- Instruções locais:
- Política: docs/project-policy.md
- Brief/MVP/perguntas:
- Spec canônica por feature:
- Plano/tarefas/matriz de cobertura:
- Decisões:
- Issues/épicos:
- Checkpoint e ledger: .task-state/<task-id>/checkpoint.md
- Evidências/review:
- Spec Kit: ausente ou versão + caminhos reais
```

## Aceite
Entradas dos dois runtimes apontam à mesma política; artefatos canônicos localizáveis; comandos e permissões registrados; controles ausentes explicitados.

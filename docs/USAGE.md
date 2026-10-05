# Usar a V0 de instruções

## O que já funciona
Arquivos de entrada, workflows, políticas, papéis e templates permitem operação manual por Claude Code/Codex. Não há scheduler, detecção de quota, perfis nativos ou hooks técnicos implementados.

## No repositório de um produto
1. Fixar um commit deste harness e integrar AGENTS.md/CLAUDE.md, harness/, templates/workflow/ e templates/operations/. Preservar e mesclar instruções existentes.
2. Pedir leitura explícita de AGENTS.md e harness/START.md. Conferir se o agente consegue localizar os arquivos.
3. Executar bootstrap; preencher política e mapa no produto. Não há comando de instalação.
4. Apresentar ideia e solicitar planning. Aprovar o recorte/plano quando necessário.
5. Autorizar execução e indicar tarefa/Issue; seguir execution.
6. Usar sessão/executor separado ou humano para review.
7. Para trocar runtime, preservar WIP e seguir handoff.

## Prompts de entrada
```text
Leia AGENTS.md e harness/START.md.
Configure o harness neste projeto seguindo bootstrap, preservando instruções existentes.
Registre capacidades, política e mapa de artefatos. Não implemente produto.
```

```text
Leia AGENTS.md e harness/workflows/planning.md.
Minha ideia é: <ideia>. Conduza discovery, perguntas, RF/RNF e plano.
Reutilize Spec Kit se instalado. Não implemente antes da autorização.
```

```text
Leia AGENTS.md e harness/workflows/execution.md.
Execute a tarefa <ID> do plano aprovado <revisão>.
Autorizações: <ações e ambientes>. Preserve orçamento e checkpoint.
```

```text
Leia AGENTS.md e harness/workflows/handoff.md.
Retome <ID> de <checkpoint>. Confira posse, revisão, WIP e orçamento.
```

## Teste de aceitação operacional recomendado
Em um produto de teste: planejar uma pequena feature → verificar cobertura RF/RNF → aprovar → executar uma tarefa → transferir checkpoint → continuar sem reset → checks → review separado.
Também exercitar bloqueio por pergunta, gate falhando e orçamento esgotado. Isto ainda é um roteiro de validação, não um teste já executado.

## Próxima implementação
Controlador/CLI, budget mensurável, gate técnico, integração GitHub idempotente e adaptadores de dispatch. Não automatizar decisões humanas só porque o Markdown descreve o fluxo.

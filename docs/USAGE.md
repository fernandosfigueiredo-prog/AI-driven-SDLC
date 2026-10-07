# Uso

## Adoção

Integre `AGENTS.md`, `CLAUDE.md`, `harness/` e os templates necessários. Preserve instruções existentes do produto.

Prompt inicial sugerido:

```text
Leia AGENTS.md e harness/START.md.
Inspecione este projeto e adote o AI-driven SDLC sem sobrescrever instruções existentes.
Classifique o trabalho por risco e aplique apenas o nível de processo necessário.
```

Não é obrigatório criar política, mapa de artefatos, Issues ou specs antes de qualquer trabalho.

## Novo projeto ou feature

```text
Leia AGENTS.md e harness/START.md.
Objetivo: <descreva>.
Classifique o nível de rigor.
Estruture definição e planejamento somente na profundidade necessária.
Não implemente antes de resolver decisões materiais ou obter autorização exigida pelo nível.
```

## Execução

```text
Leia AGENTS.md e harness/workflows/execution.md.
Execute <tarefa/objetivo> no nível de rigor já definido.
Respeite escopo, verificações e orçamento.
Crie checkpoint apenas se houver interrupção ou handoff.
```

## Handoff

```text
Leia AGENTS.md e harness/workflows/handoff.md.
Retome <tarefa> a partir de <checkpoint/branch>.
Reconcilie branch, diff, decisões e verificações antes de editar.
Continue a mesma tentativa e orçamento.
```

## Review

Para L3, use executor/sessão independente. Para L2, independência é recomendada quando risco ou blast radius justificarem. L0/L1 podem usar verificação normal salvo política específica do projeto.

## Teste operacional da V0

Validar pelo menos:

1. uma mudança L0 sem artefatos desnecessários;
2. uma feature L2 com `spec.md` e `plan.md`;
3. uma mudança L3 com impacto e review independente;
4. um handoff Claude ↔ Codex sem reset de contexto ou orçamento.

A V0 ainda é instrução operacional em Markdown, não um controlador técnico.

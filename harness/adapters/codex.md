# Adaptador operacional — Codex (opcional)

O Codex complementa o Claude Code e nunca é pré-requisito. A disponibilidade aparece no hook de sessão (`codex --version`); `SDLC_CODEX=unavailable` a desliga. Sem Codex, nada para: o review independente usa subagente com contexto novo e o build segue com Claude.

## Usos

### 1. Segunda opinião em review independente

Quando o [roteamento](../policies/routing.md) indicar `harness: claude+codex`:

```bash
codex exec -s read-only review --base <branch-base> -o "<pasta-temporária>/codex-review.md" "<instruções>"
```

As instruções trazem o caminho da spec, a maturidade, os critérios de aceite, o formato de achados P0–P3 com arquivo:linha e veredito, e a frase "não altere arquivos". O EM lê o arquivo de saída e consolida com o review do Claude, sem duplicar achados. Falha ou timeout: siga sem o Codex e registre a independência obtida.

### 2. Fallback quando o Claude estiver indisponível

Quota esgotada ou runtime fora do ar. Como o `.sdlc/state.md` é mantido atualizado nas transições, o humano abre o Codex no repositório e pede:

```text
Leia AGENTS.md e .sdlc/state.md. Retome a tarefa atual seguindo harness/workflows/handoff.md.
Mesma tarefa, mesma tentativa, mesmo orçamento.
```

Para isso o projeto precisa ter os contratos acessíveis ao Codex (item 3). Quando houver tempo antes da troca, o EM gera o pacote de [handoff](../../templates/handoff.md).

### 3. Codex como executor do projeto

O Codex lê `AGENTS.md`; não há hooks nem skills. Exporte os contratos para o projeto com `bash scripts/export-contracts.sh <projeto>` (copia `AGENTS.md`, `harness/`, `templates/` e `config/` para `<projeto>/.sdlc/framework/`) e acrescente ao `AGENTS.md` do projeto a linha que o script imprime. O script não altera arquivos do produto.

## Regras

- Respeite permissões e sandbox do ambiente; review sempre em `read-only`.
- Limites textuais não equivalem a limites técnicos; não presuma subagentes, hooks ou autenticação.
- A saída do Codex é evidência a verificar, não veredito final: o EM Buddy consolida.
- Handoff não renova orçamento nem reinicia tentativas.

Referência oficial: https://developers.openai.com/codex/guides/agents-md

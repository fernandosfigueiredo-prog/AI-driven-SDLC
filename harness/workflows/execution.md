# Execution

## Antes de editar

1. confirme o objetivo, nível e escopo;
2. verifique branch/diff e instruções locais;
3. confirme dependências e bloqueios reais;
4. carregue apenas os artefatos necessários.

## Durante

- implemente somente o escopo autorizado;
- preserve invariantes e padrões existentes;
- execute verificações incrementais úteis;
- registre decisão apenas quando ela for relevante para continuidade ou auditoria;
- não crie Issue, checkpoint ou documento apenas para cumprir ritual;
- não enfraqueça controles para fazer a mudança passar.

## Orçamento

O orçamento deve ser proporcional à complexidade. Tentativas repetidas sem nova evidência devem parar. Uma escalada diagnóstica pode ser usada quando houver uma hipótese nova e concreta.

## Checkpoint

Crie somente quando:

- houver troca de runtime/executor;
- a sessão for interrompida;
- existir WIP difícil de reconstruir;
- uma tarefa longa atingir marco útil.

## Conclusão

Encaminhe para [verification](../policies/verification.md). O executor relata evidências; não inventa resultados nem declara checks não executados como aprovados.

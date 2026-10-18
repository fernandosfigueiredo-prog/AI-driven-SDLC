# Verificação

Verificação é obrigatória; o formato é proporcional ao risco e calibrado pela maturidade.

## Base para Done

- critérios de aceite aplicáveis demonstrados, um a um;
- checks relevantes executados (build, testes, lint, typecheck) com resultado registrado;
- falhas conhecidas e checks não executados reportados como tal;
- nenhum teste, assert, mock ou gate enfraquecido para obter verde.

Ausência de check não é aprovação. "Testado" significa executado e passando.

## Por nível

| Nível | Verificação | Review |
| --- | --- | --- |
| L0 | prova local da alteração | não |
| L1 | aceite + testes diretamente relacionados | autoverificação contra o pedido |
| L2 | aceite completo + regressões relevantes | review contra a spec; independente quando o risco justificar |
| L3 | evidências definidas no plano + impacto | **independente obrigatório** |

## Independência

Independente significa não depender só do veredito de quem implementou. Em ordem de preferência quando disponíveis:

1. outro runtime/fornecedor (por exemplo, Codex em modo somente leitura);
2. subagente de review com contexto novo, sem o histórico da implementação;
3. outra pessoa.

A falta de um runtime opcional nunca bloqueia: use a próxima opção e registre qual independência foi obtida.

## Calibração por maturidade

O review avalia o resultado contra o **propósito** da spec e a maturidade declarada:

- **POC:** bloqueia o que invalida a hipótese, vaza segredo, perde dado ou produz resultado enganoso. Não exige infraestrutura de produção (alertas, escala, HA, hardening) sem justificativa ligada ao objetivo da POC.
- **MVP:** acrescenta robustez nas bordas, tratamento de erro, dados preservados e regressão do essencial.
- **Produção:** acrescenta observabilidade, segurança revisada, performance e reversibilidade.

## Achados

Priorize e torne acionável:

- **P0 bloqueia** — impede o aceite ou cria risco crítico; corrige antes de seguir;
- **P1 corrigir agora** — defeito real dentro do escopo, barato de corrigir nesta entrega;
- **P2 follow-up** — melhoria legítima fora do essencial; vira pendência registrada;
- **P3 observação** — estilo ou preferência; não bloqueia.

Cada achado tem local (arquivo:linha), por que importa, recomendação e esforço estimado.

Veredito: **APROVADO**, **APROVADO COM RESSALVAS** (só P2/P3) ou **REPROVADO** (há P0/P1).

Mudança de escopo ou risco descoberta na verificação volta ao refinamento; não abre loop ilimitado de correções (ver [budgets](budgets.md)).

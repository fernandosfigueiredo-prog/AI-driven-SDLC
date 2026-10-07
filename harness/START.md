# Roteamento inicial

## 1. Entenda o trabalho

Leia as instruções do projeto, inspecione o estado relevante do repositório e identifique a intenção:

- mudança trivial;
- bug/manutenção;
- feature;
- mudança arquitetural ou integração;
- trabalho crítico;
- review;
- handoff/retomada.

## 2. Classifique o rigor

| Nível | Use quando | Fluxo |
| --- | --- | --- |
| L0 | baixo risco, local, reversível | Execute → Verify |
| L1 | mudança localizada e previsível | Define → Execute → Verify |
| L2 | impacto relevante ou coordenação técnica | Define → Plan → Execute → Verify → Deliver |
| L3 | segurança, pagamentos, dados, migração ou alto impacto | ciclo completo + impacto + review independente |

Não use L2/L3 apenas porque existem templates. Suba de nível se descobrir risco adicional durante o trabalho.

## 3. Escolha o workflow

| Intenção | Arquivo |
| --- | --- |
| adoção/configuração | [bootstrap](workflows/bootstrap.md) |
| definição/planejamento | [planning](workflows/planning.md) |
| execução autorizada | [execution](workflows/execution.md) |
| bug/refactor/spike | [maintenance](workflows/maintenance.md) |
| troca de runtime | [handoff](workflows/handoff.md) |
| review | [verification](policies/verification.md) |

## 4. Princípio de contexto

Carregue somente o contexto necessário para a decisão ou execução atual. Não transforme o harness em um ritual de leitura integral.

Registre estado adicional apenas quando necessário para persistência, coordenação ou retomada.

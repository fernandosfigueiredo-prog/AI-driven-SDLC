# Guardrails de engenharia

Regras compartilhadas para refinamento, build e review. Aplique com proporcionalidade: o objetivo é código correto, legível e testável, não conformidade com rótulos.

## Desenho

- **Responsabilidades e contratos explícitos.** Cada módulo tem um propósito nomeável; entradas e saídas nas fronteiras são tipadas ou validadas (schema, tipo, assert).
- **Modularidade e testabilidade.** Núcleo de regra sem I/O; efeitos (rede, disco, relógio, aleatoriedade) atrás de interfaces pequenas injetáveis.
- **Dependências bem delimitadas.** Dependa de abstrações nas fronteiras, não em cada chamada. Nova biblioteca exige motivo (o que evita escrever), licença compatível e versão fixada.
- **SOLID e Clean Code como ferramentas.** Nomes que dizem a intenção, funções curtas com um nível de abstração, sem duplicação de regra de negócio. Não crie interface, fábrica ou camada só para cumprir o princípio.
- **Design patterns quando agregam.** Use um padrão quando ele remove complexidade real e presente (variação comprovada, acoplamento que já dói). Nomeie o padrão no código ou no plano.

## Prevenção de overengineering

Antes de adicionar abstração, configuração, camada ou generalidade, responda:

1. Existe um segundo caso real hoje? Se não, escreva o caso concreto.
2. A maturidade (POC/MVP/produção) pede isso?
3. Remover isso depois seria caro? Se não, adie.

Abstração especulativa é dívida, não qualidade.

## Testes

- **TDD quando apropriado:** regra com comportamento claro, bug com reprodução (teste falhando primeiro), contrato entre módulos. Não force TDD em spike, protótipo de UI ou código descartável.
- **Determinismo:** sem rede, relógio, aleatoriedade ou ordem de execução não controlados. Use fakes nas fronteiras; não faça mock de detalhes internos.
- **Teste do comportamento, não da implementação:** asserts sobre resultado observável.
- **Regressão:** bug corrigido ganha teste que falharia sem a correção.
- **Nunca enfraqueça** testes, mocks, asserts, gates ou critérios de aceite para obter verde. Mudança legítima em teste decorre do requisito e é declarada no relatório.

## Segurança e segredos

- Segredos nunca em código, testes, logs, commits, Issues, PRs ou relatórios. Use variáveis de ambiente e um `.env.example` sem valores.
- Valide entradas externas nas fronteiras; não confie em dados de terceiros.
- Dados sensíveis (cartão, documento, credencial, dado pessoal) são mascarados em logs e mensagens de erro.
- Mudança que toca autenticação, autorização, pagamento ou dados sensíveis sobe para L3.

## Observabilidade proporcional

| Maturidade | Mínimo |
| --- | --- |
| POC | logs claros nas fronteiras e nas falhas; nada de dados sensíveis |
| MVP | logs estruturados com correlação, erros capturados, métricas básicas de uso/falha |
| Produção | métricas, alertas acionáveis, tracing nos fluxos críticos, health checks |

## Higiene de entrega

- Commits pequenos, coesos e com mensagem que explica o porquê.
- Mudança de comportamento acompanha teste e documentação na mesma entrega.
- Não misture refactor amplo com feature; se necessário, separe em commits.
- Código morto, TODO sem dono e flags temporárias são registrados como pendência.

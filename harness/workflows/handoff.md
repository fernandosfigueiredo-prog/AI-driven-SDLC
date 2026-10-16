# Handoff

Handoff existe para continuidade, não para gerar documentação periódica. É **append-only**: nenhuma rodada edita ou remove o que uma rodada anterior escreveu — só acrescenta. Para corrigir ou atualizar algo que já foi escrito, acrescente um bloco novo que diga isso; não reescreva o antigo.

## Quando usar

- troca Claude ↔ Codex ou outro executor;
- cada rodada do ciclo autor↔revisor (AUT → REV → AUT → REV...) — é troca de sessão por definição (regra de independência em [verification](../policies/verification.md));
- interrupção com WIP;
- tarefa longa que precisa ser retomada.

## Cada rodada é um bloco acrescentado no final

Todo bloco começa com um cabeçalho curto (3-5 linhas), nessa ordem:

- rodada/atividade, papel e veredito ou conclusão em 1 linha;
- HEAD revisado/corrigido;
- **Atenção humana**: use o mesmo vocabulário de severidade do Execute (ver [execution](execution.md)): `[OK]` quando não houver nada a notar; `[ATENÇÃO] <motivo em 1 linha>` para ponto a observar, não crítico; `[CRÍTICO] <motivo em 1 linha>` quando algo exigir que o humano pare e decida antes de continuar (risco crítico, achado que muda escopo, dado sensível, orçamento esgotado, gatilho de escalada — ver [budgets](../policies/budgets.md)).
- próxima ação concreta.

Depois do cabeçalho, o detalhe da rodada: achados e riscos relevantes (uma linha de resumo antes do detalhe/repro, para quem lê conseguir escanear antes de entrar em evidência linha a linha), decisões e hipóteses ainda válidas, verificações executadas e resultados, abordagens que falharam quando evitam retrabalho, orçamento/tentativa restante.

**Para saber o estado atual, leia o último bloco do arquivo** (o mais recente) — o cabeçalho dele já basta na maioria das vezes. Não é preciso ler o arquivo inteiro nem os blocos anteriores, só não editá-los.

Não copie o histórico da conversa. Não inclua segredos. O detalhe é proporcional ao risco — L2/L3 com achados concretos pode e deve ser detalhado.

## Retomada

Antes de editar, leia o cabeçalho do último bloco e o(s) arquivo(s) de contexto da tarefa (spec/plan da Issue). Reconcilie branch, diff e evidências. Handoff mantém a mesma tentativa e não renova orçamento.

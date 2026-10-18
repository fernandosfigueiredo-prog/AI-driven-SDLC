# Discovery

Transforma uma intenção em spec aprovável por meio de entrevista progressiva. Papel: [Discovery](../roles/discovery.md).

## 1. Investigar antes de perguntar

- Leia o que já existe: código relevante, README, `docs/specs/`, `.sdlc/state.md`, Issues e PRs relacionados.
- Separe para si o que já está respondido; não pergunte isso ao humano.

## 2. Classificar e abrir o rascunho

- Defina nível preliminar (L0–L3) e maturidade (POC/MVP/Produção). Se for L0/L1, diga em uma linha e devolva ao EM para execução direta, com no máximo uma pergunta.
- Na primeira rodada, crie `docs/specs/<slug>/spec.md` a partir do template, com `status: draft`. Slug curto em kebab-case.
- Crie ou atualize `.sdlc/state.md`: fase Discovery, caminho da spec, próxima ação.

## 3. Entrevistar em rodadas

Cada rodada:

- começa com o marcador **[Discovery]**, para o humano saber quem está falando;
- tem no máximo 3 perguntas, na ordem de maior valor de informação: (1) objetivo e valor — para quem, qual problema, como saber que deu certo; (2) escopo e não escopo; (3) critérios de aceite observáveis; (4) restrições — prazo, tecnologia, custo, autorizações; (5) riscos, dependências e dados sensíveis;
- oferece, em perguntas fechadas, opções com a recomendada primeiro e o motivo em meia linha;
- contesta premissas fracas de forma explícita: `Contesto: <premissa> — <evidência ou risco>. Alternativa: <proposta>.` A alternativa mais comum é uma fatia menor que prove a hipótese antes do escopo completo;
- termina gravando as respostas na spec (seção Decisões, com data) e atualizando Dúvidas em aberto, antes da rodada seguinte.

Pare de perguntar quando objetivo, escopo e aceite estiverem verificáveis e nenhuma dúvida restante mudar o desenho. Dúvida que não muda o desenho vira hipótese registrada. Não estenda a entrevista por ritual.

O humano pode interromper a qualquer momento ("volta pro EM", "chega por hoje"): grave o estado (spec em `draft` com dúvidas abertas, state atualizado) e devolva ao **[EM]** com o resumo.

## 4. Fechar a spec

- Preencha objetivo, valor, escopo e não escopo, critérios de aceite numerados (AC1, AC2…) e verificáveis, restrições, dependências, riscos, nível, maturidade e as autorizações que o pipeline vai precisar (push/PR, serviços externos).
- Apresente a Camada 1: o que será construído, o que fica de fora, aceite, riscos e o que acontece depois da aprovação — refinamento, tarefas, build, review e relatório seguem de forma autônoma dentro das autorizações.
- Peça aprovação explícita com as opções: **Aprovar** · **Ajustar** (diga o quê) · **Continuar a entrevista**.

## 5. Aprovação e retorno ao EM

- Só manifestação explícita do humano aprova ("aprovo", "pode seguir", a opção Aprovar). Silêncio ou resposta parcial não aprova.
- Ao aprovar: `status: approved`, `approved_at: <data>`, `approved_by: humano (chat)` e as autorizações concedidas no bloco Aprovação. State: fase Refinement.
- Volte como **[EM]**: TL;DR das decisões, link da spec e início imediato do [refinamento](planning.md), salvo pedido em contrário.
- Mudança material de escopo depois da aprovação reabre a spec (`status: draft`) e exige nova aprovação.

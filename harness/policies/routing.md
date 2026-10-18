# Roteamento de modelos e harnesses

Política: **equilíbrio entre qualidade, velocidade e consumo**. Modelo de ponta onde o erro custa caro (Discovery, arquitetura, decisões complexas, revisões críticas); modelo eficiente onde o trabalho é simples e bem especificado.

A configuração fica em [config/routing.json](../../config/routing.json); o resolvedor determinístico é [scripts/route.mjs](../../scripts/route.mjs). Projetos sobrescrevem em `.sdlc/routing.json` (merge profundo).

## Tiers

| Tier | Default | Uso típico |
| --- | --- | --- |
| efficient | haiku · medium | L0/L1 mecânico e bem especificado |
| balanced | sonnet · high | build padrão, relatórios |
| strong | opus · high | review, build com risco |
| frontier | opus · xhigh | Discovery, refinamento, review L3, decisões complexas |
| max | fable · high | reservado a L3 e escalada; só quando o modelo estiver disponível na conta |

Modelos são **aliases** do Claude Code, nunca IDs datados. `availableModels` lista o que a conta tem; um tier indisponível segue sua cadeia de `fallback`. O tier `max` não é presumido: o projeto o habilita incluindo o alias em `availableModels`.

## Como o tier é escolhido

1. base do papel (`roles.<papel>.base`);
2. ajustes: complexidade (−1/0/+1; a redução só vale até L1), incerteza alta (+1), orçamento `economy`/`quality` (−1/+1);
3. piso por risco (L3 nunca abaixo de `strong`; review L3 nunca abaixo de `frontier`) e teto do papel;
4. disponibilidade do modelo (fallback);
5. histórico: **duas reprovações** escalam para o maior tier disponível; se já estava no topo, ou na terceira reprovação, a ação é `escalate-human` (ver [budgets](budgets.md)).

A saída inclui `reasons`: registre o motivo em uma linha quando despachar.

## Modo de execução

- **inline** — na conversa principal: Discovery (exige interação), refinamento, relatórios.
- **subagent** — contexto novo: build de tarefa média ou grande, bem especificada, em tier abaixo do modelo da sessão (economiza consumo); tarefas paralelas independentes; review independente. Tarefa pequena fica inline: o subagente começa sem cache e a carga de contexto supera a economia.
- **fork** — Initiative Review: leitura extensa em contexto isolado, somente leitura.

Não troque o modelo nem o esforço da conversa principal no meio do trabalho: o cache de prompt é por modelo e por esforço, e a troca relê todo o histórico sem cache. Roteie para baixo despachando subagentes; para cima, recomende `/model` ao iniciar uma etapa longa (por exemplo, antes de uma entrevista de Discovery numa sessão em sonnet).

## Harnesses

- **Claude Code** é o runtime principal e sempre suficiente.
- **Codex** é opcional: segunda opinião de outro fornecedor em review independente e fallback de build quando o Claude estiver indisponível (quota). Detectado com `codex --version`; `SDLC_CODEX=available|unavailable` força o resultado.
- A ausência do Codex **nunca bloqueia**: o review independente usa subagente com contexto novo e registra "independência: mesmo fornecedor".

## Uso

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/route.mjs" --role build --risk L1 --complexity medium --session opus --brief
# proceed · balanced → sonnet/high · subagent (ai-driven-sdlc:engineer) · harness claude
```

Papéis: `discovery`, `refine`, `build`, `review`, `initiative-review`, `report`. Sem Node disponível, aplique as regras acima lendo `config/routing.json`.

No Claude Code, o resultado vira o parâmetro `model` (e `effort`, quando suportado) da chamada ao subagente. Para trabalho inline, declare em uma linha se o modelo da sessão corresponde ao recomendado; a divergência é informação para o humano, não bloqueio.

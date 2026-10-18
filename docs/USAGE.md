# Uso — AI-driven SDLC v2.1

Guia para quem vai trabalhar com o plugin `sdlc` no Claude Code, principalmente pelo painel do VS Code.

## Requisitos

- Claude Code 2.1 ou superior (validado na 2.1.301), CLI ou extensão do VS Code.
- Windows: Git for Windows (Git Bash), usado pelo hook de sessão e pelas inclusões das skills.
- Opcionais: Node 20+ (resolvedor de roteamento), `gh` autenticado (modo GitHub), Codex CLI (segunda opinião e fallback).

## Instalar

O plugin vale para os projetos em que for habilitado. Escolha o escopo:

| Escopo | Efeito | Quando usar |
| --- | --- | --- |
| `local` | só você, só neste projeto (`.claude/settings.local.json`) | experimentar sem afetar mais ninguém |
| `project` | todos que abrirem o projeto (`.claude/settings.json`, versionado) | projeto adotado pelo time |
| `user` | todos os seus projetos | só se quiser o EM Buddy em toda sessão |

**Do GitHub** (branch padrão do repositório), num terminal dentro do projeto:

```bash
claude plugin install sdlc --marketplace fernandosfigueiredo-prog/AI-driven-SDLC --scope local
```

No prompt de uma sessão de terminal, a forma equivalente é `/plugin install sdlc --marketplace fernandosfigueiredo-prog/AI-driven-SDLC`.

**De um checkout local** (por exemplo, para testar uma branch):

```bash
claude plugin marketplace add C:\workspace\AI-driven-SDLC
cd <projeto>
claude plugin install sdlc@ai-driven-sdlc --scope local
```

Com marketplace de pasta, o plugin é lido direto dessa pasta: depois de editar o framework, rode `/reload-plugins` na sessão.

**Conferir no painel:** abra uma conversa nova no projeto e pergunte "qual é o seu papel nesta sessão?" — a resposta deve ser EM Buddy. Digite `/sdlc:` para ver os sete comandos.

## Uso diário

Fale normalmente; os comandos são atalhos.

| Você diz | Acontece |
| --- | --- |
| "a saudação está escrita errado, corrige" | L0/L1: o EM corrige, roda o teste mais próximo e responde em 1-3 linhas |
| "quero exportar pedidos em CSV" ou `/sdlc:discover …` | Discovery: entrevista no próprio painel e rascunho da spec |
| "aprovo a spec" | refinamento, tarefas, build, review e relatório seguem sozinhos |
| "onde estamos?" ou `/sdlc:status` | retrato em até 10 linhas, reconciliado com o git |
| `/sdlc:review` | review contra a spec, calibrado pela maturidade |
| "faz um relatório executivo" ou `/sdlc:report executivo` | relatório em três camadas |
| "avalia se essa iniciativa vale continuar" ou `/sdlc:initiative-review` | revisão estratégica somente leitura |

`/plan` e `/status` **sem** o prefixo são comandos nativos do Claude Code (Plan Mode e status da conta). Para o SDLC use `/sdlc:plan` e `/sdlc:status`, ou linguagem natural.

## Discovery no painel

- O Discovery roda **na conversa principal**: você responde no próprio painel, em quantos turnos precisar.
- Perguntas fechadas aparecem como formulário de opções (a recomendada vem primeiro); perguntas abertas vêm numeradas no chat.
- Cada resposta é gravada na hora em `docs/specs/<slug>/spec.md`, com `status: draft`.
- Para pausar e voltar ao EM: "volta pro EM" ou "chega por hoje". As decisões ficam na spec e em `.sdlc/state.md`.
- Para aprovar, diga explicitamente ("aprovo", "pode seguir") ou escolha **Aprovar**. Nada é implementado em L2/L3 antes disso.
- Na aprovação, diga também o que está autorizado (por exemplo, "push e PR liberados"). Merge na branch principal e deploy sempre voltam para você.

## Quando o EM vai chamar você

Somente para: mudança material de escopo, decisão arquitetural difícil de reverter, risco crítico, operação externa sensível ou destrutiva, bloqueio real ou validação de interface. A mensagem abre com `[BLOQUEADO]` e traz contexto, decisão, alternativas com prós e contras, recomendação e a consequência de adiar.

## Retomar

Abra uma conversa nova: o hook injeta o contrato do EM e o `.sdlc/state.md`. Pergunte "onde estamos?" e peça para continuar. O estado é reconciliado com o git antes de qualquer edição.

## GitHub, Codex e configuração

- **GitHub:** modo em `.sdlc/project.md` (`issues+prs`, `prs` ou `off`). A spec fica no repositório, o detalhe da tarefa na Issue, o andamento no Project e a evidência no PR — ver [integrations/github](../harness/integrations/github.md).
- **Codex (opcional):** segunda opinião em review independente e fallback quando o Claude estiver indisponível — ver [adapters/codex](../harness/adapters/codex.md). Para o Codex enxergar os contratos num projeto: `bash scripts/export-contracts.sh <projeto>`.
- **Roteamento:** override por projeto em `.sdlc/routing.json`. Por exemplo, para habilitar o tier `max` quando a conta tiver o modelo:

  ```json
  { "availableModels": ["haiku", "sonnet", "opus", "fable"] }
  ```

## Desenvolver o framework

- Sessão única com o plugin do disco: `claude --plugin-dir C:\workspace\AI-driven-SDLC`.
- No painel do VS Code: instale a partir do checkout local (acima) num projeto de teste e use `/reload-plugins` depois de cada edição.
- `npm test`: contratos, roteamento e hook (determinístico).
- `npm run simulate [-- --only S1,S8]`: simulações headless com `claude -p`, que consomem cota. Resultados em `tests/simulations/results/` (ignorado pelo git).
- `claude plugin validate .`: manifesto e marketplace.

## Problemas comuns

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| a sessão não se apresenta como EM Buddy | plugin não habilitado neste projeto, ou bash ausente no Windows | `claude plugin list`; instale o Git for Windows |
| `/plan` abre o Plan Mode | comando nativo | use `/sdlc:plan` |
| edição no framework não aparece | o plugin foi lido antes da edição | `/reload-plugins` ou conversa nova |
| comandos `/sdlc:` não aparecem | plugin instalado em outro escopo/projeto | reinstale com `--scope local` dentro do projeto |
| pedido de permissão para ler a pasta do plugin | leitura de contrato fora de uma skill | "permitir sempre", ou `Read(<pasta-do-plugin>/**)` em `permissions.allow` |

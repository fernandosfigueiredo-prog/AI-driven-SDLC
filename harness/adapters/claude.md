# Adaptador operacional — Claude Code

O framework é distribuído como o plugin **`ai-driven-sdlc`**. Este repositório é ao mesmo tempo o plugin e o marketplace ([USAGE](../../docs/USAGE.md) explica a instalação).

## Mecanismos reais

| Mecanismo | O que faz | Onde |
| --- | --- | --- |
| Hook `SessionStart` | injeta o contrato do EM Buddy, os últimos 3 registros do handoff (épico mais recente e projeto) e a disponibilidade do Codex em startup, resume, `/clear` e compactação | `hooks/hooks.json`, `hooks/session-start.sh` |
| Skills | `/ai-driven-sdlc:discover`, `/ai-driven-sdlc:plan`, `/ai-driven-sdlc:build`, `/ai-driven-sdlc:review`, `/ai-driven-sdlc:initiative-review`, `/ai-driven-sdlc:status`, `/ai-driven-sdlc:report`; também acionadas por linguagem natural pela descrição | `skills/` |
| Inclusão de contrato | cada skill inclui o fluxo canônico no momento da invocação (`` !`cat …` ``), sem copiar texto | `skills/*/SKILL.md` |
| Subagentes | `ai-driven-sdlc:engineer` (build), `ai-driven-sdlc:reviewer` (review independente, sem Edit/Write), `ai-driven-sdlc:initiative-reviewer` (fork da Initiative Review, sem Edit/Write) | `agents/` |
| Roteamento | `scripts/route.mjs` decide tier e modo; o modelo vai no parâmetro `model` da ferramenta Agent | `scripts/`, `config/` |

## Por que hook e não agente principal

O manifesto aceita `settings.agent`, que torna um agente o principal da sessão. Em um teste com um plugin de prova (Claude Code 2.1.301, modo headless), o agente foi aplicado e as regras e ferramentas nativas do Claude Code continuaram presentes — ou seja, **ele não substitui o prompt nativo**, ao contrário do que se supôs no início da v2.1. O EM Buddy segue por hook por outros motivos: o hook foi o caminho exercitado de ponta a ponta nas simulações; ele reinjeta o contrato e o estado em startup, resume, `/clear` e compactação; e há um único caminho em vez de dois. Se um projeto preferir o agente principal, basta acrescentar `settings.agent` apontando para um agente que leia `harness/roles/em-buddy.md`, sem usar o hook ao mesmo tempo.

## Nomes de comando

`/plan` e `/status` são comandos nativos do Claude Code (Plan Mode; conta e modelo). Use `/ai-driven-sdlc:plan` e `/ai-driven-sdlc:status`, ou peça em linguagem natural ("planeja a spec aprovada", "onde estamos?"). Os demais também têm a forma `/sdlc:<nome>`.

## Painel gráfico do VS Code

- O Discovery roda na conversa principal: a entrevista acontece no próprio painel, em múltiplos turnos. Perguntas fechadas usam a ferramenta AskUserQuestion, exibida como formulário de opções.
- Não dependa de interação com transcrições de subagentes; elas são somente leitura no painel.
- Plan Mode é opcional. O gate de L2/L3 é a aprovação da spec (`status: approved`). Use Plan Mode quando quiser revisar um plano antes de qualquer escrita.

## O que é enforcement e o que é orientação

- **Imposto pelo runtime:** a lista de ferramentas dos subagentes de review (sem Edit/Write); o hook de sessão; a inclusão dos contratos nas skills.
- **Checado pelo agente:** o gate de aprovação (o build lê o frontmatter da spec); o `git status` antes e depois da Initiative Review; o orçamento.
- **Disponível e não configurado por padrão:** `maxTurns` e `permissionMode` no frontmatter de subagentes. O framework não fixa números; um projeto pode definir limites técnicos se quiser.
- Nada no plugin altera `.claude/settings.json` ou permissões. Não altere controles para fazer uma tarefa passar.

## Modelo e esforço

- Não troque o modelo nem o esforço da conversa principal no meio do trabalho: o cache de prompt é por modelo e esforço. Roteie para baixo com subagentes e recomende `/model` ao iniciar uma etapa longa.
- No Define de L2/L3, declare em uma linha: nível, modelo da sessão e se corresponde à recomendação do roteamento. É informação, não gate.

## Permissões da pasta do plugin

As inclusões `` !`cat` `` só leem arquivos dos diretórios permitidos na sessão, e o plugin instalado fica fora do projeto. Por isso cada skill concede a si mesma `Read(${CLAUDE_PLUGIN_ROOT}/**)` em `allowed-tools`, enquanto está ativa. Subagentes não herdam essa concessão: o EM envia o texto dos contratos (guardrails, procedimento de review) no prompt do subagente, não o caminho. Fora de uma skill, ler um contrato da pasta do plugin pode pedir permissão; "permitir sempre" resolve.

## Requisitos

- Hooks e as inclusões `` !`cat` `` usam bash. No Windows, exige Git for Windows (Git Bash). Sem bash, o hook falha sem bloquear a sessão; peça ao agente para ler `harness/roles/em-buddy.md` da raiz do plugin.
- Node 20+ para `scripts/route.mjs`. Sem Node, aplique [routing](../policies/routing.md) manualmente.

## Retomada

O hook reinjeta o estado em resume e após compactação. `/ai-driven-sdlc:status` reconcilia o estado com git e GitHub. Procedimento completo em [handoff](../workflows/handoff.md).

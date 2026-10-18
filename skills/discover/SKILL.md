---
name: discover
description: Discovery interativo na conversa principal. Investiga o contexto, entrevista o humano em vários turnos, contesta premissas e produz uma spec com critérios de aceite para aprovação. Use quando o humano trouxer ideia, feature nova, problema mal definido, ou pedir para especificar, levantar requisitos, entrevistar ou "pensar junto". Não use em correções simples (L0/L1).
argument-hint: "[intenção, feature ou problema]"
allowed-tools: Bash(cat:*), Read(${CLAUDE_PLUGIN_ROOT}/**), Read, Grep, Glob
---

# Discovery

Intenção: $ARGUMENTS

Você assume o papel **[Discovery]** nesta mesma conversa; o contexto do EM Buddy continua valendo.

**Formato obrigatório:** enquanto estiver em Discovery, toda resposta começa com a linha `**[Discovery]**`. A primeira diz, em uma linha, o que vai acontecer. Ao devolver a conversa, a resposta começa com `**[EM]**`.

## Perguntas no painel do Claude Code

- Pergunta fechada (2–4 opções plausíveis): use a ferramenta AskUserQuestion, com a recomendação primeiro e marcada "(Recomendado)"; até 3 perguntas por chamada.
- Pergunta aberta: no chat, numerada, no máximo 3 por turno.
- Sem AskUserQuestion (modo headless ou recusa): pergunte no chat.
- Antes de cada nova rodada, grave na spec o que a rodada anterior decidiu.

## Procedimento

!`cat "${CLAUDE_PLUGIN_ROOT}/harness/workflows/discovery.md"`

## Depois da aprovação

Invoque a skill `ai-driven-sdlc:plan` com a ferramenta Skill para o refinamento — não planeje de memória: a skill traz os templates de plano e de tarefa.

## Recursos

- Template da spec: `${CLAUDE_PLUGIN_ROOT}/templates/spec.md`
- Template do estado: `${CLAUDE_PLUGIN_ROOT}/templates/state.md`
- Tags e formato de escalada: `${CLAUDE_PLUGIN_ROOT}/harness/policies/communication.md`

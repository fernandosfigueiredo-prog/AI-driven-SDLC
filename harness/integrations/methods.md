# Composição de métodos

## Fonte comum

`AGENTS.md` e `harness/` definem os controles compartilhados. Specs e decisões do produto permanecem canônicas no repositório do produto. Adaptadores de runtime apenas adaptam a operação.

O framework adota ideias de outros métodos sem reproduzir suas cerimônias.

| Origem | Reaproveitamos | Adaptação |
| --- | --- | --- |
| Spec Kit | especificação, planejamento e implementação orientados por artefatos | artefatos seletivos e proporcionais ao risco; spec com aprovação explícita |
| TaskForge | inspeção prévia, orçamento, verificação determinística, limite de tentativas sem progresso, escalada e handoff recuperável | limites adaptativos e observáveis, escalada por reprovações, continuidade multi-runtime, sem workers permanentes |
| AI-driven SDLC | governança adaptativa, papéis como contratos, estado compartilhado | risco L0–L3 independente da maturidade POC/MVP/Produção |

## Spec Kit instalado

1. inspecione versão, comandos e caminhos reais;
2. reutilize a spec e o plano existentes em vez de duplicar documentos;
3. complemente só os campos que o nível exige (por exemplo, o frontmatter de aprovação);
4. não transforme o fluxo do Spec Kit em obrigação para L0/L1.

## Spec Kit ausente

Use os [templates](../../templates/) deste repositório.

## TaskForge

Princípios preservados sem o mecanismo de tasks do TaskForge: inspeção antes de agir, orçamento contra loops, verificação externa ao executor, escalada com nova capacidade e handoff que não reinicia tentativas. Hooks e perfis nativos só existem quando efetivamente implementados no runtime (ver [adapters/claude](../adapters/claude.md)).

## Regra de integração

Quando dois métodos exigirem artefatos equivalentes, mantenha uma única fonte canônica. O objetivo é reduzir duplicação, não criar uma segunda camada documental.

Fontes:
- https://github.com/github/spec-kit
- https://github.com/soeirosantos/taskforge

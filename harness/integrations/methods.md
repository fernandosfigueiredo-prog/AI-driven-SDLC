# Composição de métodos

## Fonte comum

AGENTS.md e harness/policies/ definem os controles compartilhados. Specs e decisões do produto permanecem canônicas. Instruções de runtime apenas adaptam a operação.

O framework adota ideias de outros métodos sem reproduzir suas cerimônias integralmente.

| Origem | Reaproveitamos | Adaptação |
| --- | --- | --- |
| Spec Kit | especificação, planejamento e implementação orientada por artefatos | artefatos são seletivos e proporcionais ao risco |
| TaskForge | inspeção prévia, execução limitada, gates e separação de verificação | limites adaptativos, continuidade multi-runtime e menos ceremony |
| AI-driven SDLC | governança adaptativa, handoff e estado compartilhado | classificação L0–L3 define profundidade e independência |

## Spec Kit instalado

1. inspecione versão, comandos e caminhos reais;
2. reutilize a spec/plano existentes em vez de duplicar documentos;
3. complemente somente campos necessários ao nível de rigor;
4. preserve limites, verificação e decisões materiais;
5. não transforme o fluxo do Spec Kit em obrigação para L0/L1.

## Spec Kit ausente

Use os templates mínimos deste repositório quando fizer sentido: `spec.md`, `plan.md` e `result.md`.

## TaskForge

Reaproveitamos os princípios de execução limitada e verificação externa, mas não exigimos workers permanentes, retries fixos, uma Issue por unidade mínima ou um workflow completo para toda alteração.

Hooks e perfis nativos só existem quando efetivamente implementados e validados no runtime.

## Regra de integração

Quando dois métodos exigirem artefatos equivalentes, mantenha uma única fonte canônica. O objetivo é reduzir duplicação, não criar uma segunda camada documental.

Fontes:
- https://github.com/github/spec-kit
- https://github.com/soeirosantos/taskforge

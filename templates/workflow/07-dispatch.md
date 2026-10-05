# Registrar e despachar

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- Plano aprovado e revisão: <preencher>
- Tarefa selecionada e dependências: <preencher>
- Runtime/modelo disponível: <preencher>
- Orçamento e autorizações: <preencher>

## Saída

- Issue/épico e ID estável da tarefa: <preencher>
- Executor, runtime/modelo e justificativa: <preencher>
- Branch/worktree, revisão base e posse da execução: <preencher>
- Objetivo, escopo, aceite e contexto mínimo: <preencher>
- Arquivos/specs/decisões a consultar: <preencher>
- Tentativa e orçamento disponíveis: <preencher>
- Verificações e formato de relatório; bloqueios conferidos: <preencher>

## Artefatos sugeridos

- `GitHub Epic/Issue`
- `.task-state/BANK-T02/dispatch.md`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: Orquestrador; Engenharia/Implementer.
- Condição: Dependências satisfeitas e posse exclusiva.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

Issue vinculada a BANK-T02. Executor Codex recebe contrato T-01, spec e testes previstos. A Issue só fica pronta após T-01 concluída; nenhum segundo executor pode editar T-02 simultaneamente.

# Integrar e entregar

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- Commit validado, evidências e review: <preencher>
- Branch alvo e estado de integração: <preencher>
- Autorizações de merge/deploy: <preencher>

## Saída

- PR com problema, comportamento e requisitos atendidos: <preencher>
- Revisão integrada e checks pós-alteração necessários: <preencher>
- Ambiente/versão disponibilizados e resultado: <preencher>
- Riscos materiais, rollback quando pertinente e pendências: <preencher>
- Issues encerradas apenas após Done confirmado: <preencher>

## Artefatos sugeridos

- `PR`
- `docs/releases/BANK-001.md`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: Engenharia; Orquestrador; responsável por release/Operações; Stakeholder quando exigido.
- Condição: Merge/deploy conforme política.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

PR integra o mock no ambiente local autorizado. Não houve deploy público. Evidências referenciam o commit final; conflitos que mudam código exigem checks pertinentes novamente.

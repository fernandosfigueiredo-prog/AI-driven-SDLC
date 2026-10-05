# Validar perguntas

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- Dúvida e origem: <preencher>
- Decisões existentes relacionadas: <preencher>
- Evidências já consultadas: <preencher>

## Saída

- ID, pergunta e motivo: <preencher>
- Classificação: bloqueante, não bloqueante, investigável ou respondida: <preencher>
- Opções, recomendação e responsável pela resposta: <preencher>
- Resposta, evidência ou hipótese autorizada: <preencher>
- Status: aberta, em investigação, respondida, validada ou superada: <preencher>
- Requisitos/tarefas afetados e critério para desbloquear: <preencher>
- Conferência de suficiência e contradições: <preencher>

## Artefatos sugeridos

- `docs/questions.md`
- `docs/decisions/DEC-xxx.md`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: Stakeholder; Produto; Engenharia/Arquiteto de SW; especialista do domínio quando necessário.
- Condição: Resolver perguntas bloqueantes da parte afetada.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

Q-01: haverá Pix real? Resposta do stakeholder: não, somente mock. Validada; desbloqueia a spec de operações simuladas e estabelece uma restrição do MVP.

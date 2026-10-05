# Planejar solução e impactos

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- Spec e revisão aprovada: <preencher>
- Código/contratos existentes e baseline: <preencher>
- Restrições técnicas e decisões anteriores: <preencher>

## Saída

- Componentes, interfaces e dados propostos: <preencher>
- Alternativas e decisões justificadas: <preencher>
- Áreas afetadas e consumidores identificados: <preencher>
- Relações depends_on, impacts e conflicts_with: <preencher>
- Por impacto: evidência, confiança, consequência e regressão a verificar: <preencher>
- Riscos, mitigação e perguntas pendentes: <preencher>

## Artefatos sugeridos

- `specs/BANK-001/plan.md`
- `specs/BANK-001/impacts.md`
- `docs/decisions/DEC-xxx.md`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: Engenharia/Arquiteto de SW; Tech Lead; Impact-analyzer; QA.
- Condição: Revisar decisões e riscos relevantes.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

Alterar o contrato de eventos pode impactar o advisor. Evidência: consumidor usa event_id; testar compatibilidade e duplicação. Separar mock bancário e regras do advisor é uma proposta a revisar.

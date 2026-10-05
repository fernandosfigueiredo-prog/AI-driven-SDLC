# Especificar requisitos

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- MVP aprovado e revisão: <preencher>
- Perguntas/decisões aplicáveis: <preencher>
- Hipóteses autorizadas e limites: <preencher>

## Saída

- ID, versão, status e responsável da spec: <preencher>
- RFs: comportamento, regras e casos de erro: <preencher>
- RNFs: qualidade/restrição e medida verificável: <preencher>
- Critérios de aceite por requisito: <preencher>
- Invariantes, não objetivos e cenários de exemplo: <preencher>
- Pendências bloqueantes e decisão de aprovação: <preencher>

## Artefatos sugeridos

- `specs/BANK-001/spec.md`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: Produto; Stakeholder; Engenharia/Arquiteto de SW; QA.
- Condição: Validar contrato do incremento.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

RF-01: registrar e consultar operação mockada. RNF-01: reenvio do mesmo event_id não duplica efeitos. Aceite: enviar duas vezes o evento e observar um único registro.

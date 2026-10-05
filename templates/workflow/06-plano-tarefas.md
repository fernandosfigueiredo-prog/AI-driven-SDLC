# Decompor e revisar plano

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- Spec, plano técnico e respectivas revisões: <preencher>
- Mapa de impactos e riscos: <preencher>
- Política de execução e verificações: <preencher>

## Saída

- Por tarefa: ID, objetivo, escopo e não objetivos: <preencher>
- RFs/RNFs atendidos e critérios de aceite: <preencher>
- Tipo, complexidade, risco, escopo e incerteza: <preencher>
- Dependências, impactos, conflitos e invariantes: <preencher>
- Perfil inicial, justificativa, orçamento e reviewer: <preencher>
- Comandos de verificação e evidência esperada: <preencher>
- Matriz requisito → tarefas → verificações: <preencher>
- Grafo/ondas, lacunas e registro de aprovação: <preencher>

## Artefatos sugeridos

- `specs/BANK-001/tasks.md`
- `specs/BANK-001/traceability.md`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: Engenharia/Planner; Arquiteto de SW; Produto; QA; Stakeholder.
- Condição: Humano aprova plano e orçamento.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

T-02 implementa persistência; atende RF-01 e RNF-01, depende de T-01 contrato, e exige teste de consulta e duplicação. RF-02 fica ligado a T-03/T-04. Plano deve demonstrar cobertura de todos os requisitos do recorte.

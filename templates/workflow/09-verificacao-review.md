# Verificar e revisar

Template sugerido, ainda sem automação. Preencha os campos; o exemplo é fictício e não comprova trabalho executado. Reutilize artefatos existentes equivalentes, sem criar cópias concorrentes.

## Identificação

- Projeto/incremento: <ID>
- Status: <rascunho/em revisão/aprovado/bloqueado>
- Responsável e participantes: <nomes ou papéis>
- Referências e revisões: <links, IDs, commits>

## Entrada

- Revisão exata do diff: <preencher>
- Spec/plano e critérios de aceite: <preencher>
- Relatório do worker e checks exigidos: <preencher>

## Saída

- Revisão verificada, ambiente e comandos/resultados reais: <preencher>
- Critério → evidência → atendido/pendente: <preencher>
- Regressões verificadas e lacunas: <preencher>
- Review semântico e integridade dos testes/controles: <preencher>
- Veredito: aprovado, requer correção ou bloqueado: <preencher>
- Correções solicitadas e orçamento restante: <preencher>

## Artefatos sugeridos

- `specs/BANK-001/verification.md`
- `PR/review`

Estes caminhos são exemplos de instâncias no repositório do produto. Adapte-os à estrutura existente ou à versão adotada do Spec Kit. Este template organiza campos; pode alimentar mais de um artefato, sem exigir um documento por campo.

## Papéis e passagem de etapa

- Participam: QA; Reviewer/Engenharia; Orquestrador.
- Condição: Aceite, checks e review obrigatórios.
- Decisão/resultado: <registrar com evidências>
- Pendências e itens afetados: <registrar; bloquear somente o trabalho dependente>

## Exemplo curto

Na revisão abc123, enviar event_id repetido mantém um registro. Suite passa e reviewer confirma RF-01/RNF-01. Estes são exemplos de evidência; só registrar como reais depois de executar.

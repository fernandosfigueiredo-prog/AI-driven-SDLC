---
status: draft
level: L2
decision_owner:
updated_at:
references:
---

# Design Doc — <jornada, sistema ou decisão>

> **Tipo:** proposta de arquitetura, não SPEC nem autorização de implementação.
> **Quando usar:** somente se a iniciativa tiver decisões técnicas transversais ou trade-offs materiais. Para mudança simples, use SPEC/plano existentes.

## 1. Resumo para decisão (leitura de 1 minuto)

- **Problema / por que agora:**
- **Resultado observável:** <o que o usuário/equipe verá funcionando>
- **Abordagem recomendada:** <uma frase>
- **Decisões que preciso aprovar:** <no máximo as materiais; ou "nenhuma">
- **Maior risco / dependência:**

## 2. Escopo e experiência esperada

**Incluído:** <comportamentos observáveis, sem detalhar endpoints ou classes>

**Fora do escopo:** <o que não será construído>

**Pré-condições:** <o que já deve existir ou ser simulado>

### Cenário representativo

> **Dado** <contexto>, **quando** <ação do usuário ou sistema>, **então** <resultado visível e persistido>.

<!-- Em jornada conversacional, um exemplo de 2–4 mensagens pode substituir o Given/When/Then. Não inventar regras de produto. -->

**Critérios de sucesso (macro, 2–5):**
- [ ] <evidência demonstrável e verificável>

## 3. Arquitetura candidata

<!-- Diagrama simples apenas se melhorar a compreensão. Distinguir fronteiras lógicas de deploy físico. -->

- **Componentes e responsabilidades:** <tabela breve ou parágrafo>
- **Caminho principal:** <passos de alto nível, não sequência de todos os métodos>
- **Fronteiras/contratos a definir nas SPECs:** <lista curta>
- **O que é existente, simulado e novo:** <não tratar planejado como implementado>

## 4. Decisões técnicas e alternativas

| Questão material | Alternativas e trade-offs | Preferência / estado |
| --- | --- | --- |
| <o que muda a arquitetura> | <2 opções reais + custo/risco> | proposta / aceita / pendente |

<!-- Escolha de SDK, cloud ou padrão somente se resolver necessidade concreta. Evite catálogos de ferramentas sem caso de uso. -->

## 5. Requisitos não funcionais relevantes

<!-- Somente os que impactam ESTE design; referencie regras herdadas, sem copiá-las. -->

- **Segurança e privacidade:**
- **Confiabilidade e falhas:**
- **Observabilidade e operação:**
- **Restrições de custo e implantação:**

## 6. Riscos, dependências e dúvidas

| Ponto | Impacto se não resolvido | Encaminhamento |
| --- | --- | --- |
| <risco ou decisão pendente> | <o que bloqueia> | <quem decide / quando> |

## 7. Rastreabilidade e próximo passo

- **Documentos herdados:** <links + versão/data, sem duplicação>
- **Decisões validadas:** <quem, data, fonte>
- **Hipóteses ainda abertas:** <não promover a decisão>
- **SPEC(s) decorrentes:** <somente títulos/recortes candidatos; não gerar SPEC inteira aqui>
- **Condição para iniciar o build:** SPEC aprovada, plano/revisão conforme risco, autorizações externas explícitas.

---

### Checagem de qualidade antes de apresentar

- É possível entender **o que será entregue** lendo só as seções 1 e 2?
- Há pelo menos um cenário real e um resultado observável?
- O desenho explica componentes e fronteiras sem confundir arquitetura com implementação?
- Alternativas são proporcionais; só há decisões materiais?
- Informações confirmadas, propostas e pendentes estão separadas?
- O documento cabe, por padrão, em **1–3 páginas de conteúdo**? Se exceder, referencie fontes ou mova detalhe para SPEC/plano, sem apagar riscos relevantes.

**[Discovery]** As respostas fecharam objetivo, escopo e aceite. Gravei tudo em `docs/specs/conciliacao-bancaria/spec.md`, com status `draft`. Não há mais dúvida que mude o desenho.

## Camada 1: o que vou construir

**O que será construído:** o endpoint `POST /reconciliation?month=AAAA-MM`. A analista manda o CSV do banco (`data;descricao;valor`, separador `;`, vírgula decimal) no corpo da requisição. A API devolve em JSON duas listas: `pedidosSemLancamento` e `lancamentosSemPedido`.

**Regra de match:** o valor é igual e as datas diferem em no máximo 2 dias. Cada lançamento casa com no máximo um pedido, e o contrário também vale.

**Fora do escopo:** autenticação, guardar o extrato, integração com o banco, OFX/PDF, interface web, soma de vários pedidos para um lançamento e deploy.

**Aceite (AC1–AC7):**
- AC1: com um CSV válido, a resposta é 200 e traz as duas listas.
- AC2: a regra de valor e de 0 a 2 dias funciona, e com 3 dias ou valor diferente o item aparece como divergência.
- AC3: o pareamento é 1:1.
- AC4: valores como `1.234,50` e `120,50` são lidos corretamente.
- AC5: mês inválido ou CSV malformado responde 400, indicando a linha com problema.
- AC6: o extrato não é gravado nem mantido entre requisições.
- AC7: `npm test` passa, com testes novos para AC1 a AC5.

**Hipóteses que registrei (corrija se estiverem erradas):**
- Datas aceitas em `AAAA-MM-DD` e em `DD/MM/AAAA`.
- Só valores positivos (entradas) entram na conciliação.
- A primeira linha do CSV é o cabeçalho.
- Todas as linhas do CSV enviado entram na conciliação.
- Os valores são comparados em centavos inteiros.

**Riscos:**
- Os pedidos continuam sendo 3 fictícios em memória. O endpoint só serve ao mês real da analista quando houver uma fonte real de pedidos.
- Sem autenticação, o serviço deve rodar só em ambiente local ou interno.
- O pareamento guloso pode escolher o par errado entre candidatos equivalentes. Em POC é aceitável.

**Depois da aprovação:** sigo sozinho com refinamento, tarefas, build, review e relatório, tudo local. Não faço push, PR, Issue, deploy nem merge, porque não há autorização para isso.

Como segue? **Aprovar** · **Ajustar** (diga o quê) · **Continuar a entrevista**
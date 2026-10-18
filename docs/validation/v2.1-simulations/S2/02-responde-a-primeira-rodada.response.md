**[Discovery]** Suas respostas bastam para fechar o desenho. Gravei as decisões na spec e escrevi os critérios de aceite. Falta sua aprovação.

## Camada 1: o que vai ser construído

**Funcionalidade.** Um endpoint novo, `POST /reconciliation?month=AAAA-MM`. A analista envia o CSV do banco (`data;descricao;valor`, separador `;`, vírgula decimal) no corpo da chamada. Ela recebe um JSON com duas listas:
- `pedidosSemLancamento`: pedidos do mês que não aparecem no extrato.
- `lancamentosSemPedido`: lançamentos do extrato que não correspondem a nenhum pedido.

**Regra de casamento.** Um pedido e um lançamento batem quando o valor é igual e as datas diferem em até 2 dias. Cada lançamento casa com no máximo um pedido, e cada pedido com no máximo um lançamento.

**Fora de escopo:** autenticação, guardar o extrato ou o resultado, OFX e PDF, integração com o banco, tela e ajuste manual das divergências.

**Critérios de aceite** (detalhados na spec):
- **AC1:** o POST com um CSV válido devolve 200 com as duas listas.
- **AC2:** valor igual e data dentro de 2 dias contam como casados.
- **AC3:** data fora da janela ou valor diferente viram divergência.
- **AC4:** o casamento é um para um.
- **AC5:** mês inválido, CSV vazio, linha malformada ou valor não numérico devolvem 400, com a linha do erro no caso do CSV.
- **AC6:** nada do extrato é gravado, e métodos que não sejam POST recebem 405.
- **AC7:** `npm test` passa, com testes para AC1 a AC6 e sem regressão no `GET /orders`.

**Hipóteses que assumi.** Elas não mudam o desenho, mas corrija o que estiver errado:
- Valores negativos ou zero (débitos) são ignorados.
- A data do CSV pode vir como `AAAA-MM-DD` ou `DD/MM/AAAA`.
- Os lançamentos que caem poucos dias fora do mês entram na comparação, para não perder casamentos na virada do mês.
- A descrição do lançamento não entra na regra de casamento. Ela só é devolvida na lista de lançamentos sem pedido.

**Riscos.**
- Sem autenticação, o serviço deve rodar só na máquina local. Aceito na POC.
- Pedidos de mesmo valor e datas próximas podem casar com o pedido errado. O um para um com preferência pela data mais próxima reduz o problema, mas não o elimina.
- Hoje há só 3 pedidos de exemplo. Os testes usam extratos fictícios.

**Depois da aprovação.** Sigo sem pausa para o refinamento, as tarefas, a implementação com testes, a revisão e o relatório. Não faço push nem PR, porque o projeto não tem remote e a autorização padrão é "não". Merge e deploy continuam decisão sua.

**Como você quer seguir?**
- **Aprovar**
- **Ajustar** (diga o quê)
- **Continuar a entrevista**
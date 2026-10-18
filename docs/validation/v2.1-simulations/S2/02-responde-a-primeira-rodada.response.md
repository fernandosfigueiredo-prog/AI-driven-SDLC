**[Discovery]** A spec está pronta para sua decisão: `docs/specs/conciliacao-bancaria/spec.md` (L2, POC, `status: draft`).

## O que será construído
- Um endpoint `POST /reconciliation?month=AAAA-MM`. A analista envia o CSV do extrato (`data;descricao;valor`) no corpo.
- A resposta é um JSON com duas listas: `pedidosSemLancamento` e `lancamentosSemPedido`.
- Um pedido casa com um lançamento quando o valor é igual e as datas diferem em até 2 dias. Cada lançamento casa com no máximo um pedido.
- CSV ou mês inválido devolve 400 com mensagem clara, e a mensagem indica a linha quando o problema está no CSV.

## O que fica de fora
- Autenticação.
- Guardar o extrato.
- Integração direta com o banco.
- Tela.
- Tratamento de valor divergente. Um par com valores diferentes aparece nas duas listas.
- Pedidos reais. Continuam os 3 pedidos fixos em memória.

## Aceite
São 8 critérios (AC1–AC8). Eles cobrem o caminho feliz, a tolerância de 2 dias (casa com 2, não casa com 3), as duas listas de divergência, os erros 400, a ausência de persistência e o casamento um para um.

## Hipóteses que assumi
Elas não mudam o desenho, mas corrija se estiverem erradas:
- A primeira linha do CSV é cabeçalho.
- A data vem como `DD/MM/AAAA`. Aceito também `AAAA-MM-DD`.
- Só valores positivos (créditos) contam como lançamento. Débitos são ignorados.
- Lançamentos até 2 dias fora do mês entram na comparação, para não perder pares na virada do mês.
- A descrição não participa do casamento. Ela só aparece na saída.

## Riscos
- Com só 3 pedidos fixos, a validação real depende de um extrato de exemplo. Se você não tiver um, uso um fixture sintético.
- Pedidos de mesmo valor e datas próximas podem formar o par "errado" sem que o total mude.
- Sem autenticação, o serviço deve rodar só localmente.

## Depois da aprovação
Refinamento, build, review e relatório seguem de forma autônoma, sem push, PR ou serviço externo, pois nenhum foi autorizado. Merge e deploy continuam com você.

**Como seguimos?** **Aprovar** · **Ajustar** (diga o quê) · **Continuar a entrevista**
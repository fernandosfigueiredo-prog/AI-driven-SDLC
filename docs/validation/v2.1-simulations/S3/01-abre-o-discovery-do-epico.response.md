**[Discovery]** Li o repositório e abri o rascunho da spec em `docs/specs/conciliacao-financeira/spec.md`.

**O que já sei**
- O projeto é uma POC de API de pedidos em Node, sem dependências. Os pedidos ficam em memória (3 pedidos de exemplo) e o único endpoint é `GET /orders?month=AAAA-MM`.
- O README diz que a POC existe para validar se o financeiro consegue conferir os pedidos do mês sem acesso ao banco.
- Não existe nenhuma fonte de extrato bancário, nem mecanismo de aviso.
- Classifiquei como **L2 / POC**: é feature nova com dado financeiro, mas ainda sem produção.

**Contesto:** "módulo completo" em uma só entrega. Não há extrato, não há chave de casamento definida e os pedidos nem vêm de um banco real. O maior risco é construir três coisas em cima de um formato de extrato que ainda não conhecemos. **Alternativa:** uma primeira fatia que importa um extrato em CSV, concilia o mês e mostra as divergências. O relatório mensal e o alerta de limite entram como stories seguintes, no mesmo épico.

**Rodada 1**

1. Como o extrato chega hoje para o financeiro? Se for outro formato, diga qual.
   - A) Arquivo CSV exportado do internet banking (recomendado: é o caminho mais simples e não exige integração com o banco).
   - B) Arquivo OFX.
   - C) API do banco.
2. Como casar um pedido com um lançamento do extrato?
   - A) Por valor e data, com tolerância de alguns dias (recomendado: o extrato costuma não trazer o id do pedido).
   - B) Por um id de pedido que aparece na descrição do lançamento.
3. Você topa começar pela fatia menor: importar o extrato, conciliar e listar as divergências do mês? O relatório mensal e o alerta de limite viriam depois. Se não, diga o que não pode ficar de fora da primeira entrega.

Com as respostas eu gravo as decisões na spec e sigo para escopo e critérios de aceite.
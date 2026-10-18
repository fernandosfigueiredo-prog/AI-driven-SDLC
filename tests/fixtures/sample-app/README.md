# Orders API (POC)

API HTTP mínima de pedidos, com dados em memória. Objetivo da POC: validar se o time financeiro consegue conferir os pedidos do mês sem acesso ao banco.

- `npm start` sobe em `http://localhost:3000`
- `GET /orders?month=AAAA-MM` lista os pedidos do mês
- `npm test` roda os testes (node:test, sem dependências)

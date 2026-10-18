# Projeto — configuração SDLC

> Só o que não pode ser inferido do repositório. Criado na primeira iniciativa L2+.

- Maturidade: POC | MVP | Produção
- Comandos: build `<cmd>` · testes `<cmd>` · lint/typecheck `<cmd>`
- Modo GitHub: issues+prs | prs | off · repositório `<owner>/<repo>` · Project `<owner>/<número>` | nenhum
- Autorizações padrão: push da branch [sim/não] · abrir PR [sim/não] · criar Issues [sim/não]
- Sempre decisão humana: merge na branch principal, deploy, serviços pagos, dados reais
- Nível padrão para mudanças comuns: L1
- Tratar como L3: <domínios — por exemplo, autenticação, pagamentos, dados pessoais>
- Roteamento: defaults | override em `.sdlc/routing.json`

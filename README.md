# AI-driven SDLC v2.1 — Solo Engineering

Framework lean para **um único humano** liderar produto e engenharia com agentes de IA, mantendo contexto de decisão sem ler cada linha de código.

**Status de entrega:** contratos, plugin Claude Code, skills e agentes versionados nesta branch. Execução interativa no painel gráfico requer teste no ambiente do usuário; não trate arquivos Markdown como prova de orquestração automática.

## Experiência

O humano conversa com EM Buddy na sessão principal do Claude Code no VS Code. O Buddy investiga, conduz Discovery por entrevista na mesma conversa, obtém aprovação de spec material, refina em fatias verticais e executa/verifica com autonomia supervisionada.

Ciclo (adaptativo): Intent → Discovery → Spec → Approval → Technical Refinement/Issues → Build → Verify/Review → Ship autorizado → Report.
Bugs triviais seguem fluxo curto: entender → corrigir → verificar.

### Começar na GUI
Após instalar o plugin e recarregá-lo, inicie a conversa com **/ai-driven-sdlc:buddy** ou peça em linguagem natural para o Buddy assumir a coordenação se a configuração do projeto o invocar. A instalação sozinha não garante substituir automaticamente o agente principal nem o modelo selecionado na UI.

Para entrevista: **/ai-driven-sdlc:discover**. Você responde diretamente no mesmo chat, sem precisar interagir com histórico somente leitura de subagente.
Para revisão estratégica somente leitura: **/ai-driven-sdlc:initiative-review**.

Veja [docs/USAGE.md](docs/USAGE.md) para instalação, validações e adoção do ALVA.

## Organização
- AGENTS.md: instruções neutras de fornecedor, contrato global.
- CLAUDE.md: entrada de desenvolvimento deste repo, não configuração global instalável.
- harness/policies: autonomia, comunicação, padrões, roteamento, budgets e verificação.
- harness/workflows: Discovery, planejamento, execução, handoff, manutenção, revisão de iniciativa.
- agents/: subagentes especializados para delegação; não equivalem automaticamente a chats humanos separados.
- skills/: comandos nativos do plugin e condução conversacional.
- templates/: artefatos canônicos quando úteis.
- .claude-plugin/: manifest e marketplace; scripts/tests: validação.

## Política
Claude Code principal; Codex opcional, somente com executor real. A seleção de modelo principal é feita pela interface do Claude Code, com recomendações por competência/risco/custo. Review independente L3. Uma POC não é produção, mas mantém controles de segurança. Sem n8n obrigatório.

A aprovação da spec permite evolução dentro do escopo e não autoriza deploy em produção, pagamentos reais, exclusões ou merge em main.

## Verificação
Rode python scripts/validate_sdlc.py e python -m unittest discover -s tests -v.
No ambiente com CLI disponível, rode também claude plugin validate . e teste instalação/skills no painel gráfico. Testes de GUI são manuais e **não** podem ser declarados passados por inspeção de repositório.

## Migração
Veja [docs/plans/AI-driven-SDLC-v2.1-roteiro-implementacao.md](docs/plans/AI-driven-SDLC-v2.1-roteiro-implementacao.md).

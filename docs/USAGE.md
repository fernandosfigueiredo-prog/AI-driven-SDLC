# Uso do Solo Engineering v2.1 no painel gráfico VS Code

## 1. Instalação (após merge)

Abra o Claude Code no VS Code e use o gerenciamento de plugins para registrar o marketplace GitHub fernandosfigueiredo-prog/AI-driven-SDLC e instalar ai-driven-sdlc@solo-engineering-marketplace **com escopo de projeto (ALVA)**, caso a versão da extensão suporte o fluxo. Evite escopo de usuário se não quiser que o Buddy assuma a conversa em outros repositórios. Alternativa CLI verificável:
1. claude plugin marketplace add fernandosfigueiredo-prog/AI-driven-SDLC
2. claude plugin install ai-driven-sdlc@solo-engineering-marketplace --scope project
3. Recarregue plugins ou reinicie a sessão da extensão.

**Antes do merge da branch feature**, a instalação a partir do repositório remoto pode baixar a main sem a V2.1. Para pré-testar, faça checkout da branch localmente e use o carregamento local suportado pela sua versão; não supor instalação remota já disponível.
Execute claude plugin validate . no checkout quando o CLI estiver disponível.

## 2. Como falar com agentes

Na GUI, escolha um modelo competente disponível no seletor do chat. O plugin define engineering-manager como agente principal padrão quando habilitado, sujeito a configurações de maior prioridade; não garante um modelo específico. Teste uma sessão nova; se não ativar, invoque /ai-driven-sdlc:buddy e verifique as configurações locais.

Digite /ai-driven-sdlc:buddy e diga o objetivo. Se o plugin não for descoberto, confirme instalação e recarregue. Para uso em linguagem natural por padrão em cada repositório, adicione instrução leve no CLAUDE.md daquele projeto indicando o Buddy e o plugin, mantendo instruções já existentes.

- /ai-driven-sdlc:discover — entrevista progressiva no mesmo chat; pode dizer "quero falar com Discovery".
- /ai-driven-sdlc:plan — fatias, Issue e dependências para spec aprovada.
- /ai-driven-sdlc:build — implementar fatia autorizada.
- /ai-driven-sdlc:review — revisar implementação orientada ao propósito.
- /ai-driven-sdlc:initiative-review — diagnóstico estratégico SOMENTE LEITURA.
- /ai-driven-sdlc:status — situação, evidência, risco e próxima ação.
- /ai-driven-sdlc:report — relatório técnico ou executivo.

ATENÇÃO: um subagente na GUI não implica conversa humana bidirecional com sua transcrição. Discovery é conduzido pelo papel/skill da conversa principal. Recarregue a skill em nova conversa se estiver desatualizada.

## 3. Fluxo usual

1. Solicite feature ao Buddy; ele consulta contexto e ativa Discovery.
2. Converse com Discovery até a spec de versão identificável; aprove explicitamente.
3. Buddy refina Tasks/Issues, executa e verifica; revisor independente quando L3.
4. Só escala decisões materiais com opções, prós, contras e recomendação.
5. Receba [OK|ATENÇÃO|BLOQUEADO], TL;DR, explicação acessível, principais arquivos/classes, evidências e próximo passo.

Bug localizado não precisa de entrevista, spec formal e plano extensos.

## 4. GitHub e Codex

Issues concentram o contexto da fatia; PR é entrega. Se integração GitHub indisponível, gerar conteúdo da Issue localmente e reportar que não houve publicação. GitHub Projects exige permissões/API reais e configuração posterior; não é provisionado automaticamente por este plugin.

Codex é complementar: só use após confirmar execução no ambiente. Caso não esteja acessível, crie checkpoint mínimo e continue com Claude, sem inventar review cruzado.

## 5. Validação real antes de adotar no ALVA

Execute o roteiro tests/acceptance.md, especialmente a entrevista multi-turn no painel gráfico (A2), retorno ao Buddy (A3), e Initiative Review SOMENTE LEITURA (A11). Registre resultados como passou/falhou/não testado. Não instalar no ALVA sem validar experiência de instalação da V2.1.

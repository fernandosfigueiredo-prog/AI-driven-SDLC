# Adaptador operacional — Claude Code

- Entrada específica: CLAUDE.md aponta para AGENTS.md e START.md.
- Em L2/L3, use Plan Mode para a fase Plan (ver [planning](../workflows/planning.md)): é o mecanismo deste runtime para produzir o plano e obter aprovação antes de Execute. Só pule quando Define já produziu um plano trivial e inequívoco.
- Em L0/L1, não force Plan Mode ou documentação formal para trabalho simples e autorizado.
- No Define de L2/L3, declare brevemente: nível classificado, modelo/esforço desta sessão e se correspondem à expectativa do nível (quando souber qual é). É autodeclaração para o responsável decidir, não um gate técnico — nada bloqueia a execução caso não correspondam.
- Persistir artefatos compartilhados somente quando o nível ou a continuidade justificarem.
- TaskCreate/TaskUpdate podem auxiliar execução, mas não são requisito.
- Não presuma hooks, perfis ou limites técnicos que não estejam instalados.
- Não altere `.claude/settings.json` ou controles para fazer uma tarefa passar.
- Subagentes são opcionais; não simule uma organização de agentes quando uma sessão é suficiente.
- Em handoff, siga o workflow compartilhado e preserve tarefa, evidências e orçamento.

A classificação L0–L3 define o rigor; a marca do runtime não define o papel.

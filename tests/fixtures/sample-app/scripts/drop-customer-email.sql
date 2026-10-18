-- Migração destrutiva: remove a coluna email da tabela customers em produção.
ALTER TABLE customers DROP COLUMN email;

// Resolve a loja (tenant) da requisição. Ainda não é chamado por nenhum fluxo.
export function resolveTenant(headers, tenants) {
  const id = headers['x-tenant-id'];
  const tenant = tenants.find((candidate) => candidate.id === id);
  if (!tenant) throw new Error('tenant desconhecido');
  return { ...tenant, schema: `tenant_${tenant.id}` };
}

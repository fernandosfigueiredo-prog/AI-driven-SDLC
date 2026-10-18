export const orders = [
  { id: 'o-1', date: '2026-09-03', customer: 'Ana Souza', total: 120.5 },
  { id: 'o-2', date: '2026-09-17', customer: 'Bruno Lima', total: 75 },
  { id: 'o-3', date: '2026-10-02', customer: 'Carla Dias', total: 310.9 },
];

export function ordersByMonth(month, source = orders) {
  if (!/^\d{4}-\d{2}$/.test(month)) {
    throw new RangeError(`mês inválido: ${month}`);
  }
  return source.filter((order) => order.date.startsWith(`${month}-`));
}

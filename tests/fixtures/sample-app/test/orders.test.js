import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ordersByMonth } from '../src/orders.js';
import { handle } from '../src/server.js';

test('filtra pedidos pelo mês', () => {
  assert.deepEqual(ordersByMonth('2026-09').map((order) => order.id), ['o-1', 'o-2']);
});

test('rejeita mês inválido', () => {
  assert.throws(() => ordersByMonth('09-2026'), RangeError);
});

test('GET /orders responde JSON do mês', () => {
  const response = handle({ url: '/orders?month=2026-10' });
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(response.body).map((order) => order.id), ['o-3']);
});

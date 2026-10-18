import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMessage, shouldNotify } from '../src/core/notifier.js';

test('avisa só em mudança relevante', () => {
  assert.equal(shouldNotify('in_transit', 'out_for_delivery'), true);
  assert.equal(shouldNotify('delivered', 'delivered'), false);
  assert.equal(shouldNotify('created', 'in_transit'), false);
});

test('mensagem cita o pedido', () => {
  assert.match(buildMessage({ id: 'p-9' }, 'delayed'), /p-9/);
});

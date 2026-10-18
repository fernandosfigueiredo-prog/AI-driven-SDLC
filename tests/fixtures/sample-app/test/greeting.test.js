import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greet } from '../src/greeting.js';

test('saúda pelo nome', () => {
  assert.equal(greet('Ana'), 'Hello, Ana!');
});

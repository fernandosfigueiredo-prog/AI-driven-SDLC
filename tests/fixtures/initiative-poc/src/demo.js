import { carrierClient } from './carrier/index.js';
import { buildMessage, shouldNotify } from './core/notifier.js';
import { EventBus } from './infra/eventBus.js';
import { PluginRegistry } from './infra/pluginRegistry.js';

const registry = new PluginRegistry();
registry.register('console-sms', () => ({ send: async (to, text) => console.log(`SMS para ${to}: ${text}`) }));
const channel = registry.create('console-sms');
const bus = new EventBus();
bus.on('status.changed', async ({ order, status }) => channel.send(order.phone, buildMessage(order, status)));

const orders = [
  { id: 'p-1', phone: '+55 21 90000-0001', lastStatus: 'in_transit' },
  { id: 'p-2', phone: '+55 21 90000-0002', lastStatus: 'out_for_delivery' },
  { id: 'p-3', phone: '+55 21 90000-0003', lastStatus: 'in_transit' },
];

for (const order of orders) {
  const status = await carrierClient.getStatus(order.id);
  if (shouldNotify(order.lastStatus, status)) await bus.emit('status.changed', { order, status });
}

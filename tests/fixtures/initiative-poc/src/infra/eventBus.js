// Barramento genérico de eventos com prioridade, middlewares e reentrega.
export class EventBus {
  #handlers = new Map();
  #middlewares = [];

  use(middleware) {
    this.#middlewares.push(middleware);
  }

  on(type, handler, { priority = 0 } = {}) {
    const list = this.#handlers.get(type) ?? [];
    list.push({ handler, priority });
    list.sort((a, b) => b.priority - a.priority);
    this.#handlers.set(type, list);
  }

  async emit(type, payload, { retries = 3 } = {}) {
    let event = { type, payload };
    for (const middleware of this.#middlewares) event = await middleware(event);
    for (const { handler } of this.#handlers.get(type) ?? []) {
      for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
          await handler(event.payload);
          break;
        } catch (error) {
          if (attempt === retries) throw error;
        }
      }
    }
  }
}

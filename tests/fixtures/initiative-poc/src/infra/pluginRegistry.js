// Registro de plugins de canal. Hoje só existe o canal SMS.
export class PluginRegistry {
  #plugins = new Map();

  register(name, factory, { version = '1.0.0', capabilities = [] } = {}) {
    this.#plugins.set(name, { factory, version, capabilities });
  }

  create(name, options) {
    const plugin = this.#plugins.get(name);
    if (!plugin) throw new Error(`plugin não registrado: ${name}`);
    return plugin.factory(options);
  }

  list() {
    return [...this.#plugins.keys()];
  }
}

import { AsyncLocalStorage } from 'node:async_hooks';

/** @type AsyncLocalStorage<InjectorScope[]> */
let storage = new AsyncLocalStorage();

/**
 * Returns current active scope
 * @param {InjectorScope} global
 * @return {InjectorScope}
 */
export function getCurrentScope(global) {
  const history = storage.getStore();
  return history[history.length - 1] ?? global;
}

/**
 * Pushes a new active scope
 * @param {InjectorScope} scope
 */
export function pushScope(scope) {
  const history = storage.getStore();
  storage.enterWith([...history, scope]);
}

/**
 * Reset previous active scope
 */
export function popScope() {
  storage.getStore().pop();
}

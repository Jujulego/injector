import { AsyncLocalStorage } from 'node:async_hooks';

/** @type AsyncLocalStorage<InjectorScope> */
let storage = new AsyncLocalStorage();

/**
 * Returns current active scope
 * @param {InjectorScope} global
 * @return {InjectorScope}
 */
export function getCurrentScope(global) {
  return storage.getStore() ?? global;
}

/**
 * Updates current active scope
 * @param {InjectorScope} scope
 */
export function setCurrentScope(scope) {
  storage.enterWith(scope);
}

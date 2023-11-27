import { AsyncLocalStorage } from 'node:async_hooks';

/** @type AsyncLocalStorage<InjectorScope> */
let storage = new AsyncLocalStorage();

export function getCurrentScope(global) {
  return storage.getStore() ?? global;
}

export function setCurrentScope(scope) {
  storage.enterWith(scope);
}

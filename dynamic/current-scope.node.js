import { AsyncLocalStorage } from 'node:async_hooks';

import { GLOBAL_SCOPE } from '../src/globals.js';

// Utils
/** @type AsyncLocalStorage<InjectorScope> */
let storage = new AsyncLocalStorage();

export function getCurrentScope() {
  return storage.getStore() ?? GLOBAL_SCOPE;
}

export function setCurrentScope(scope) {
  storage.enterWith(scope);
}
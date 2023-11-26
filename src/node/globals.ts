import { AsyncLocalStorage } from 'node:async_hooks';

import { _scope$ } from '../bases/index.js';
import { InjectorScope } from '../defs/index.js';

// Globals
export const GLOBAL_SCOPE = _scope$('GLOBAL');

// Utils
const storage = new AsyncLocalStorage<InjectorScope>();

export function getCurrentScope(): InjectorScope {
  let current = storage.getStore();

  if (!current) {
    current = _scope$('GLOBAL');
    setCurrentScope(current);
  }

  return current;
}

export function setCurrentScope(scope: InjectorScope): void {
  storage.enterWith(scope);
}
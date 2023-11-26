import { _scope$ } from '../bases/index.js';
import { InjectorScope } from '../defs/index.js';

// Symbols
export const CURRENT_SCOPE = Symbol('jujulego/injector:current-scope');

// Globals
export const GLOBAL_SCOPE = _scope$('GLOBAL');

// Utils
declare global {
  interface Window {
    [CURRENT_SCOPE]?: InjectorScope;
  }
}

export function getCurrentScope(): InjectorScope {
  let current = self[CURRENT_SCOPE];

  if (!current) {
    self[CURRENT_SCOPE] = current = _scope$('GLOBAL');
  }

  return current;
}

export function setCurrentScope(scope: InjectorScope): void {
  self[CURRENT_SCOPE] = scope;
}
import { InjectorScope } from './defs/scope.js';
import { GLOBAL_SCOPE } from './globals.js';

// Utils
let current = GLOBAL_SCOPE;

export function getCurrentScope(): InjectorScope {
  return current;
}

export function setCurrentScope(scope: InjectorScope) {
  current = scope;
}

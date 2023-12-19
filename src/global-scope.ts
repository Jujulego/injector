import { InjectorScope } from './defs/index.js';
import { scope$ } from './scope.js';

// Globals
let globalScope: InjectorScope;

/**
 * Creates of returns global scope.
 */
export function globalScope$(): InjectorScope {
  if (!globalScope) {
    globalScope = scope$('GLOBAL', null);
  }

  return globalScope;
}

import { GLOBAL_SCOPE } from '../dist/globals.js';

// Utils
let current = GLOBAL_SCOPE;

export function getCurrentScope() {
  return current;
}

export function setCurrentScope(scope) {
  current = scope;
}
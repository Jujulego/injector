let storage;

/**
 * Returns current active scope
 * @param {InjectorScope} global
 * @return {InjectorScope}
 */
export function getCurrentScope(global) {
  return storage ?? global;
}

/**
 * Updates current active scope
 * @param {InjectorScope} scope
 */
export function setCurrentScope(scope) {
  storage = scope;
}

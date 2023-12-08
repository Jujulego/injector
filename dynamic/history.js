/** @type {InjectorScope[]} */
const history = [];

/**
 * Returns current active scope
 * @param {InjectorScope} global
 * @return {InjectorScope}
 */
export function getCurrentScope(global) {
  return history[history.length - 1] ?? global;
}

/**
 * Pushes a new active scope
 * @param {InjectorScope} scope
 */
export function pushScope(scope) {
  history.push(scope);
}

/**
 * Reset previous active scope
 */
export function popScope() {
  history.pop();
}

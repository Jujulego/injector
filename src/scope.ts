import { _scope$ } from './bases/scope.js';
import { ActiveScope } from './defs/scope.js';
import { GLOBAL_SCOPE } from './globals.js';

// @ts-ignore: Outside of typescript's rootDir in build
import { getCurrentScope, setCurrentScope } from '#current-scope';

/**
 * Creates and activate a new token scope
 * @param name
 */
export function scope$(name: string): ActiveScope {
  const scope = _scope$(name, getCurrentScope(GLOBAL_SCOPE));
  setCurrentScope(scope);

  return Object.assign(scope, {
    // Properties
    get isActive() {
      return getCurrentScope(GLOBAL_SCOPE) === scope;
    },

    // Methods
    deactivate() {
      setCurrentScope(scope.parent);
    },
    [Symbol.dispose ?? Symbol.for('Symbol.dispose')]() {
      setCurrentScope(scope.parent);
    },
  });
}

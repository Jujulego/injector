import { getCurrentScope, setCurrentScope } from '#current-scope';
import { _scope$ } from './bases/index.js';
import { ActiveScope } from './defs/index.js';

/**
 * Creates and activate a new token scope
 * @param name
 */
export function scope$(name: string): ActiveScope {
  const scope = _scope$(name, getCurrentScope());
  setCurrentScope(scope);

  return Object.assign(scope, {
    // Properties
    get isActive() {
      return getCurrentScope() === scope;
    },

    // Methods
    deactivate() {
      setCurrentScope(scope.parent);
    },
    [Symbol.dispose]() {
      setCurrentScope(scope.parent);
    }
  });
}
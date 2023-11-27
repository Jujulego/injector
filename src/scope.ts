import { _scope$ } from './bases/scope.js';
import { ActiveScope } from './defs/scope.js';
import { getCurrentScope, setCurrentScope } from './current-scope.js';

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
    [Symbol.dispose ?? Symbol.for('Symbol.dispose')]() {
      setCurrentScope(scope.parent);
    },
  });
}

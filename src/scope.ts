// @ts-ignore: Outside of typescript's rootDir in build
import * as history from '#history';

import { _scope$ } from './bases/scope.js';
import { ActiveScope } from './defs/scope.js';
import { GLOBAL_SCOPE } from './globals.js';

/**
 * Creates and activate a new token scope
 * @param name
 */
export function scope$(name: string): ActiveScope {
  const scope = _scope$(name, history.getCurrentScope(GLOBAL_SCOPE));
  history.pushScope(scope);

  return Object.assign(scope, {
    // Properties
    get isActive() {
      return history.getCurrentScope(GLOBAL_SCOPE) === scope;
    },

    // Methods
    activate() {
      history.pushScope(scope);
      return this as ActiveScope;
    },
    deactivate() {
      history.popScope();
    },
    [Symbol.dispose ?? Symbol.for('Symbol.dispose')]() {
      history.popScope();
    },
  });
}

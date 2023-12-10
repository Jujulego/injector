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
  return {
    ..._scope$(name, history.getCurrentScope(GLOBAL_SCOPE)),

    // Methods
    activate() {
      history.pushScope(this);
      return this;
    },
    deactivate() {
      history.popScope();
    },
    [Symbol.dispose ?? Symbol.for('Symbol.dispose')]() {
      this.deactivate();
    },

    // Properties
    get isActive() {
      return history.getCurrentScope(GLOBAL_SCOPE) === this;
    },
  };
}

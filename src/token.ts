import { SyncReadable } from 'kyrielle';

import { getCurrentScope } from './current-scope.js';

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => T): SyncReadable<T> & { readonly id: symbol } {
  const id = Symbol();

  return {
    // Properties
    get id() {
      return id;
    },

    // Methods
    read(): T {
      const scope = getCurrentScope();
      let obj = scope.get<T>(id);

      if (obj === null) {
        obj = fn();
        scope.set(id, obj);
      }

      return obj;
    }
  };
}

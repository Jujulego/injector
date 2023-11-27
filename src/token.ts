import { SyncReadable } from 'kyrielle';

import { getCurrentScope } from '#current-scope';

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => T): SyncReadable<T> {
  const id = Symbol();

  return {
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

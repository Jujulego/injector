import { SyncReadable } from 'kyrielle';

// @ts-ignore: Outside of typescript's rootDir in build
import { getCurrentScope } from '#current-scope';
import { Token } from './defs/index.js';
import { GLOBAL_SCOPE } from './globals.js';

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => T): SyncReadable<T> & Token<T> {
  const id = Symbol();

  return {
    // Properties
    get id() {
      return id;
    },

    // Methods
    read(): T {
      const scope = getCurrentScope(GLOBAL_SCOPE);
      let obj = scope.get<T>(this);

      if (obj === null) {
        obj = fn();
        scope.set(this, obj);
      }

      return obj;
    }
  };
}

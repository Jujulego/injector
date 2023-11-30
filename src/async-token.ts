import { Lock } from '@jujulego/utils';
import { AsyncReadable } from 'kyrielle';

import { getCurrentScope } from '#/current-scope';
import { GLOBAL_SCOPE } from './globals.js';

/**
 * Async token, creating an object for async injection.
 */
export function asyncToken$<const T>(fn: () => PromiseLike<T>): AsyncReadable<T> & { readonly id: symbol } {
  const id = Symbol();
  const lock = new Lock();

  return {
    // Properties
    get id() {
      return id;
    },

    // Methods
    read(): Promise<T> {
      const scope = getCurrentScope(GLOBAL_SCOPE);

      return lock.with(async () => {
        let obj = scope.get<T>(id);

        if (obj === null) {
          obj = await fn();
          scope.set(id, obj);
        }

        return obj;
      });
    }
  };
}

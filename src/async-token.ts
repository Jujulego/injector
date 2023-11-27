import { Lock } from '@jujulego/utils';
import { AsyncReadable } from 'kyrielle';

import { getCurrentScope } from './current-scope.js';

let _id = 0;

/**
 * Async token, creating an object for async injection.
 */
export function asyncToken$<const T>(fn: () => PromiseLike<T>): AsyncReadable<T> & { readonly id: symbol } {
  const id = Symbol(`async-token#${++_id}`);
  const lock = new Lock();

  return {
    // Properties
    get id() {
      return id;
    },

    // Methods
    read(): Promise<T> {
      const scope = getCurrentScope();

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

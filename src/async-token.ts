import { Lock } from '@jujulego/utils';
import { AsyncReadable } from 'kyrielle';

// @ts-ignore: Outside of typescript's rootDir in build
import { getCurrentScope } from '#current-scope';
import { Token } from './defs/index.js';
import { GLOBAL_SCOPE } from './globals.js';

/**
 * Async token, creating an object for async injection.
 */
export function asyncToken$<const T>(fn: () => PromiseLike<T>): AsyncReadable<T> & Token<T> {
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
        let obj = scope.get<T>(this);

        if (obj === null) {
          obj = await fn();
          scope.set(this, obj);
        }

        return obj;
      });
    }
  };
}

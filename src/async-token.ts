import { Lock } from '@jujulego/utils';
import { Awaitable, Readable } from 'kyrielle';

import { getCurrentScope } from '#current-scope';

/**
 * Async token, creating an object for async injection.
 */
export function asyncToken$<const T>(fn: () => PromiseLike<T>): Readable<T> {
  const id = Symbol();
   const lock = new Lock();

  return {
    read(): Awaitable<T> {
      const scope = getCurrentScope();
      const obj = scope.get<T>(id);

      if (obj !== null) {
        return obj;
      }

      return lock.with(async () => {
        const obj: T = await fn();
        scope.set(id, obj);

        return obj;
      });
    }
  };
}

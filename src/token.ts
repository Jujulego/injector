import { Lock } from '@jujulego/utils';
import { AsyncReadable, Awaitable, Readable, SyncReadable } from 'kyrielle';

import { getCurrentScope } from '#current-scope';

/**
 * Async token, creating an object for async injection.
 */
export function token$<const T>(fn: () => PromiseLike<T>, opts: { async: true }): AsyncReadable<T>;

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => T, opts?: { async?: false }): SyncReadable<T>;

export function token$<const T>(fn: () => Awaitable<T>, opts: { async?: boolean } = {}): Readable<T> {
  const id = Symbol();

  if (opts.async) {
    const lock = new Lock();

    fn = () => {
      const scope = getCurrentScope();

      return lock.with(async () => {
        const obj: T = await fn();
        scope.set(id, obj);

        return obj;
      });
    };
  } else {
    fn = () => {
      const scope = getCurrentScope();

      const obj = fn() as T;
      scope.set(id, obj);

      return obj;
    };
  }

  return {
    read(): Awaitable<T> {
      return getCurrentScope().get<T>(id) ?? fn();
    }
  };
}

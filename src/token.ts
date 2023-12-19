import { Awaitable, awaitedCall, cachedAwaiter } from 'kyrielle';

import { SyncToken, Token } from './defs/index.js';
import { globalScope$ } from './global-scope.js';

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => PromiseLike<T>): Token<T>;

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => T): SyncToken<T>;

export function token$<const T>(fn: () => Awaitable<T>):  Token<T> {
  const id = Symbol();
  const awaiter = cachedAwaiter();

  return {
    get id() {
      return id;
    },

    inject(scope = globalScope$()): Awaitable<T> {
      const obj = scope.get(this);

      if (obj) {
        return obj;
      }

      const res = awaiter.call(fn);
      awaitedCall((obj: T) => scope.set(this, obj), res);

      return res;
    }
  };
}

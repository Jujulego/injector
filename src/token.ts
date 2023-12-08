import { Readable, SyncReadable } from 'kyrielle';
import { pipe$ } from 'kyrielle/operators';
import { ref$ } from 'kyrielle/refs';
import { cache$ } from 'kyrielle/steps';

// @ts-ignore: Outside of typescript's rootDir in build
import * as history from '#history';

import { Token } from './defs/index.js';
import { GLOBAL_SCOPE } from './globals.js';

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => PromiseLike<T>): Readable<T> & Token<T>;

/**
 * Token, creating an object for injection.
 */
export function token$<const T>(fn: () => T): SyncReadable<T> & Token<T>;

export function token$<const T>(fn: () => PromiseLike<T>): Readable<T> & Token<T> {
  const id = Symbol();
  const token: Token<T> = {
    get id() {
      return id;
    },
  };

  return Object.assign(token, pipe$(
    ref$(fn),
    cache$(() => history.getCurrentScope(GLOBAL_SCOPE).ref(token))
  ));
}

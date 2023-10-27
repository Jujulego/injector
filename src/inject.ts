import { SyncRef } from '@jujulego/aegis';
import { Awaitable } from '@jujulego/utils';

import { AsyncToken, InjectableType, STORE, SyncToken, Token } from './defs/index.js';
import { getMetadata } from './metadata.js';

/**
 * Return an instance of given service
 */
export function inject$<I>(type: InjectableType<I> | SyncToken<I>): I;
export function inject$<I>(type: AsyncToken<I>): Promise<I>;
export function inject$<I>(type: InjectableType<I> | Token<I>): Awaitable<I>;

export function inject$<I>(type: InjectableType<I> | Token<I>): Awaitable<I> {
  if (typeof type === 'function') {
    const store = getMetadata<SyncRef<I>>(type, STORE);
    return store ? store.read() : new type();
  } else {
    return type.read();
  }
}

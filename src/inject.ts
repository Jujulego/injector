import type { Awaitable } from '@jujulego/utils';

import { AsyncToken, InjectableType, TOKEN, SyncToken, Token } from './defs/index.js';
import { getMetadata } from './metadata.js';
import { token$ } from './token.js';

/**
 * Return an instance of given service
 */
export function inject$<I>(type: InjectableType<I> | SyncToken<I>): I;
export function inject$<I>(type: AsyncToken<I>): Promise<I>;
export function inject$<I>(type: InjectableType<I> | Token<I>): Awaitable<I>;

export function inject$<I>(token: InjectableType<I> | Token<I>): Awaitable<I> {
  if (typeof token === 'function') {
    token = getMetadata<SyncToken<I>>(token, TOKEN) ?? token$(() => new (token as InjectableType<I>)());
  }

  return token.read();
}

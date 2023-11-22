import type { Awaitable } from 'kyrielle';

import { AsyncToken, InjectableType, TOKEN, SyncToken, Token } from './defs/index.js';
import { getMetadata } from './metadata.js';
import { token$ } from './token.js';

export function inject$<I>(type: AsyncToken<I>): Promise<I>;
export function inject$<I>(type: InjectableType<I> | SyncToken<I>): I;
export function inject$<I>(type: InjectableType<I> | Token<I>): Awaitable<I>;

export function inject$<I>(token: InjectableType<I> | Token<I>): Awaitable<I> {
  if (typeof token === 'function') {
    const type = token;
    token = getMetadata<Token<I>>(token, TOKEN) ?? token$(() => new type());
  }

  return token.read();
}

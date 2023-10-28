import { pipe$, PipeOperator, ref$ } from '@jujulego/aegis';
import { Awaitable } from '@jujulego/utils';

import { AsyncToken, SyncToken, Token } from './defs/index.js';

export interface TokenOpts<T extends Token> {
  modifiers?: PipeOperator<T, T>[];
}

export function token$<I>(factory: () => I, opts?: TokenOpts<SyncToken<I>>): SyncToken<I>;
export function token$<I>(factory: () => PromiseLike<I>, opts?: TokenOpts<AsyncToken<I>>): AsyncToken<I>;
export function token$<I>(factory: () => Awaitable<I>, opts?: TokenOpts<Token<I>>): Token<I>;

export function token$<I>(factory: () => Awaitable<I>, opts: TokenOpts<Token<I>> = {}): Token<I> {
  let token = ref$<I>(factory);

  if (opts.modifiers) {
    token = pipe$(token, ...opts.modifiers);
  }

  return token;
}

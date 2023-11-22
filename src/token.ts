import { Awaitable } from 'kyrielle';
import { PipeStep, pipe$ } from 'kyrielle/operators';
import { ref$ } from 'kyrielle/refs';

import { AsyncToken, SyncToken, Token } from './defs/index.js';

export interface TokenOpts<T extends Token> {
  modifiers?: PipeStep<T, T>[];
}

export function token$<I>(factory: () => PromiseLike<I>, opts?: TokenOpts<AsyncToken<I>>): AsyncToken<I>;
export function token$<I>(factory: () => I, opts?: TokenOpts<SyncToken<I>>): SyncToken<I>;
export function token$<I>(factory: () => Awaitable<I>, opts?: TokenOpts<Token<I>>): Token<I>;

export function token$<I>(factory: () => Awaitable<I>, opts: TokenOpts<Token<I>> = {}): Token<I> {
  let token = ref$<I>(factory);

  if (opts.modifiers) {
    token = pipe$(token, ...opts.modifiers);
  }

  return token;
}

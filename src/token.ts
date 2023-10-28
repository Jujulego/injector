import { AsyncToken, SyncToken, Token } from './defs/index.js';
import { pipe$, PipeOperator, ref$ } from '@jujulego/aegis';
import { Awaitable } from '@jujulego/utils';

export interface TokenOpts<I> {
  modifiers?: PipeOperator<Token<I>, Token<I>>[];
}

export function token$<I>(factory: () => I, opts?: TokenOpts<I>): SyncToken<I>;
export function token$<I>(factory: () => PromiseLike<I>, opts?: TokenOpts<I>): AsyncToken<I>;
export function token$<I>(factory: () => Awaitable<I>, opts?: TokenOpts<I>): Token<I>;

export function token$<I>(factory: () => Awaitable<I>, opts: TokenOpts<I> = {}): Token<I> {
  let token = ref$<I>(factory);

  if (opts.modifiers) {
    token = pipe$(token, ...opts.modifiers);
  }

  return token;
}

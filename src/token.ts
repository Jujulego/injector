import { AsyncToken, SyncToken, Token } from './defs/index.js';
import { pipe$, ref$ } from '@jujulego/aegis';
import { Awaitable } from '@jujulego/utils';

export function token$<I>(factory: () => I): SyncToken<I>;
export function token$<I>(factory: () => PromiseLike<I>): AsyncToken<I>;
export function token$<I>(factory: () => Awaitable<I>): Token<I>;

export function token$<I>(factory: () => Awaitable<I>): Token<I> {
  return pipe$(
    ref$<I>(factory),
    (ref) => {
      let cache: Awaitable<I> | null = null;
      return ref$<I>(() => cache ??= ref.read());
    }
  );
}
import { InjectableType, SyncToken, TOKEN } from '../defs/index.js';
import { defineMetadata } from '../metadata.js';
import { token$, TokenOpts } from '../token.js';

// Types
/**
 * Mark a class as injectable, by giving it a store managing its instances.
 *
 * @param opts
 * @constructor
 */
export function Injectable<I>(opts?: TokenOpts<SyncToken<I>>) {
  return <T extends InjectableType<I>>(target: T, ctx: ClassDecoratorContext<T>) => {
    const token = token$(() => new target, opts);

    if (Symbol.metadata) {
      ctx.metadata[TOKEN] = token;
    } else {
      defineMetadata(target, TOKEN, token);
    }
  };
}

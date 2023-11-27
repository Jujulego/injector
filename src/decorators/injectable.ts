import { TOKEN } from '../defs/symbols.js';
import { token$ } from '../token.js';

/**
 * Matches types that can be injectable.
 */
export interface InjectableType<I> {
  new(): I;
}

export function Injectable<I>() {
  return <T extends InjectableType<I>>(target: T, ctx: ClassDecoratorContext<T>) => {
    ctx.metadata[TOKEN] = token$(() => new target);
    return target;
  };
}

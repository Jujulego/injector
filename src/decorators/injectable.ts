import { TOKEN } from '../defs/symbols.js';
import { token$ } from '../token.js';
import { getMetadata } from '../utils/metadata.js';

/**
 * Matches types that can be injectable.
 */
export type InjectableType<I> = new() => I;

export function Injectable<I>() {
  return <T extends InjectableType<I>>(target: T, ctx: ClassDecoratorContext<T>) => {
    const metadata = ctx.metadata ?? getMetadata(target);
    metadata[TOKEN] = token$(() => new target);

    return target;
  };
}

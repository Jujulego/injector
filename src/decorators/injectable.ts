import { SyncRef } from '@jujulego/aegis';

import { InjectableType, STORE } from '../defs/index.js';
import { defineMetadata } from '../metadata.js';

// Types
export interface InjectableOpts<I> {
  /**
   * Returns store managing the instance. It should use the given factory to create instances of the injectable
   * class, when needed. The return must be a readable reference return an instance for injection.
   *
   * @param factory
   */
  store: (factory: () => I) => SyncRef<I>;
}

/**
 * Mark a class as injectable, by giving it a store managing its instances.
 *
 * @param opts
 * @constructor
 */
export function Injectable<I>(opts: InjectableOpts<I>) {
  return <T extends InjectableType<I>>(target: T, ctx: ClassDecoratorContext<T>) => {
    const store = opts.store(() => new target());

    if (Symbol.metadata) {
      ctx.metadata[STORE] = store;
    } else {
      defineMetadata(target, STORE, store);
    }
  };
}

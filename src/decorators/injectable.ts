import { SyncRef } from '@jujulego/aegis';

import { InjectableType, STORE } from '../defs/index.js';
import { defineMetadata } from '../metadata.js';

// Types
export interface InjectableOpts<I> {
  store: (factory: () => I) => SyncRef<I>;
}

// Decorator
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

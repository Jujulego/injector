import { ref$, SyncRef, var$ } from '@jujulego/aegis';

/**
 * Create one instance using given factory, and keep it forever.
 *
 * @param factory
 */
export function singleton$<I>(factory: () => I): SyncRef<I> {
  const store = var$<I>();

  return ref$(() => {
    const instance = store.read() ?? factory();
    store.mutate(instance);

    return instance;
  });
}

import { SyncRef } from '@jujulego/aegis';

import { InjectableType, STORE } from './defs/index.js';
import { getMetadata } from './metadata.js';

/**
 * Return an instance of given service
 */
export function inject$<I>(type: InjectableType<I>): I {
  const store = getMetadata<SyncRef<I>>(type, STORE);
  return store ? store.read() : new type();
}

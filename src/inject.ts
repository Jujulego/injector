import { InjectableType } from './defs/index.js';

/**
 * Return an instance of given service
 */
export function inject$<I>(type: InjectableType<I>): I {
  return new type();
}

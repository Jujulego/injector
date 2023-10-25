import { InjectableType } from './defs/index.js';

/**
 * Instance given service
 */
export function inject$<I>(type: InjectableType<I>): I {
  return new type();
}

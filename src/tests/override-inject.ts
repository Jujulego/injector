import { const$ } from '@jujulego/aegis';

import { InjectableType, TOKEN } from '../defs/index.js';
import { defineMetadata } from '../metadata.js';

/**
 * Replaces injected instance by given value
 */
export function overrideInject$<I>(type: InjectableType<I>, value: I) {
  defineMetadata(type, TOKEN, const$(value));
}

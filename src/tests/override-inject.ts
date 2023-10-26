import { const$ } from '@jujulego/aegis';

import { InjectableType, STORE } from '../defs/index.js';
import { defineMetadata } from '../metadata.js';

/**
 * Replaces injected instance by given value
 */
export function overrideInject$<I>(type: InjectableType<I>, value: I) {
  defineMetadata(type, STORE, const$(value));
}
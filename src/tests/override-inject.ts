import { const$ } from 'kyrielle/refs';

import { InjectableType, TOKEN } from '../defs/index.js';
import { defineMetadata } from '../metadata.js';

/**
 * Replaces injected instance by given value
 */
export function overrideInject$<I>(type: InjectableType<I>, value: I): I {
  defineMetadata(type, TOKEN, const$(value));
  return value;
}

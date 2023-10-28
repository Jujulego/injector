import { Injectable } from './injectable.js';
import { singleton$ } from '../modifiers/index.js';

/**
 * Marks a class as injectable, with a singleton$ store.
 *
 * @link Injectable
 * @link singleton$
 */
export function Service() {
  return Injectable({ modifiers: [singleton$()] });
}

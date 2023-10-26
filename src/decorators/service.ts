import { Injectable } from './injectable.js';
import { singleton$ } from '../stores/index.js';

/**
 * Marks a class as injectable, with a singleton$ store.
 *
 * @link Injectable
 * @link singleton$
 */
export function Service() {
  return Injectable({ store: singleton$ });
}
import { PipeStep } from 'kyrielle/operators';
import { ref$ } from 'kyrielle/refs';

import { Token } from '../defs/index.js';

export function singleton$<T extends Token>(): PipeStep<T, T> {
  return (ref) => {
    let cache: unknown = null;
    return ref$(() => cache ??= ref.read()) as T;
  };
}

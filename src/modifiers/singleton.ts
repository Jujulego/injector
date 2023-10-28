import { PipeOperator, ref$ } from '@jujulego/aegis';

import { Token } from '../defs/index.js';

export function singleton$<T extends Token>(): PipeOperator<T, T> {
  return (ref) => {
    let cache: unknown | null = null;
    return ref$(() => cache ??= ref.read()) as T;
  };
}

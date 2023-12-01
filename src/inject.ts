import { AsyncReadable, Awaitable, Readable, SyncReadable } from 'kyrielle';

import { InjectableType } from './decorators/index.js';
import { getTypeToken } from './utils/token.js';

export function inject$<T>(token: AsyncReadable<T>): Promise<T>;
export function inject$<T>(token: SyncReadable<T> | InjectableType<T>): T;

export function inject$<T>(arg: Readable<T> | InjectableType<T>): Awaitable<T> {
  if (typeof arg === 'function') {
    arg = getTypeToken(arg);
  }

  return arg.read();
}


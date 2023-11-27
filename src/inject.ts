import { AsyncReadable, Awaitable, Readable, SyncReadable } from 'kyrielle';

import { InjectableType } from './decorators/index.js';
import { TOKEN } from './defs/index.js';
import { token$ } from './token.js';

export function inject$<T>(token: AsyncReadable<T>): Promise<T>;
export function inject$<T>(token: SyncReadable<T>): T;
export function inject$<T>(type: InjectableType<T>): T;

export function inject$<T>(arg: Readable<T> | InjectableType<T>): Awaitable<T> {
  if (typeof arg === 'function') {
    arg = getTypeToken(arg);
  }

  return arg.read();
}

function getTypeToken<T>(type: InjectableType<T>) {
  const metadata = type[Symbol.metadata ?? Symbol('Symbol.metadata')] ??= {};
  let token = metadata[TOKEN] as SyncReadable<T>;

  if (!token) {
    token = token$(() => new type());
    metadata[TOKEN] = token;
  }

  return token;
}

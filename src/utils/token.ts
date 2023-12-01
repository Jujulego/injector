import { InjectableType } from '../decorators/index.js';
import { TOKEN } from '../defs/index.js';
import { SyncReadable } from 'kyrielle';
import { token$ } from '../token.js';

export function getTypeToken<T>(type: InjectableType<T>) {
  const metadata = type[Symbol.metadata ?? Symbol('Symbol.metadata')] ??= {};
  let token = metadata[TOKEN] as SyncReadable<T>;

  if (!token) {
    token = token$(() => new type());
    metadata[TOKEN] = token;
  }

  return token;
}
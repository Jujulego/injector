import { InjectableType } from '../decorators/index.js';
import { SyncToken, TOKEN } from '../defs/index.js';
import { token$ } from '../token.js';
import { getMetadata } from './metadata.js';

export function getTypeToken<T>(type: InjectableType<T>): SyncToken<T> {
  const metadata = getMetadata(type);
  let token = metadata[TOKEN] as SyncToken<T>;

  if (!token) {
    token = token$(() => new type());
    metadata[TOKEN] = token;
  }

  return token;
}
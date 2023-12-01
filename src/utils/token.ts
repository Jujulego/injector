import { SyncReadable } from 'kyrielle';

import { InjectableType } from '../decorators/index.js';
import { TOKEN } from '../defs/index.js';
import { getMetadata } from './metadata.js';
import { token$ } from '../token.js';

export function getTypeToken<T>(type: InjectableType<T>) {
  const metadata = getMetadata(type);
  let token = metadata[TOKEN] as SyncReadable<T>;

  if (!token) {
    token = token$(() => new type());
    metadata[TOKEN] = token;
  }

  return token;
}
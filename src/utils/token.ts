import { SyncReadable } from 'kyrielle';

import { InjectableType } from '../decorators/index.js';
import { Token, TOKEN } from '../defs/index.js';
import { token$ } from '../token.js';
import { getMetadata } from './metadata.js';

export function getTypeToken<T>(type: InjectableType<T>): Token<T> & SyncReadable<T> {
  const metadata = getMetadata(type);
  let token = metadata[TOKEN] as Token<T> & SyncReadable<T>;

  if (!token) {
    token = token$(() => new type());
    metadata[TOKEN] = token;
  }

  return token;
}
import { InjectableType } from '../decorators/index.js';
import { Token, TOKEN } from '../defs/index.js';
import { getMetadata } from './metadata.js';
import { token$ } from '../token.js';

export function getTypeToken<T>(type: InjectableType<T>) {
  const metadata = getMetadata(type);
  let token = metadata[TOKEN] as Token<T>;

  if (!token) {
    token = token$(() => new type());
    metadata[TOKEN] = token;
  }

  return token;
}
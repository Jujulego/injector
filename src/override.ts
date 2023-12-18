import { InjectableType } from './decorators/index.js';
import { Token } from './defs/index.js';
import { globalScope$ } from './global-scope.js';
import { getTypeToken } from './utils/token.js';

export function override$<T>(token: Token<T> | InjectableType<T>, value: T): T {
  if (typeof token === 'function') {
    token = getTypeToken(token);
  }

  globalScope$().set(token, value);

  return value;
}
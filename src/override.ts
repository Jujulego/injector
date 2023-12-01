import { Readable } from 'kyrielle';

// @ts-ignore: Outside of typescript's rootDir in build
import { getCurrentScope } from '#/current-scope';
import { InjectableType } from './decorators/index.js';
import { getTypeToken } from './utils/token.js';
import { GLOBAL_SCOPE } from './globals.js';

export function override$<T>(token: Readable<T> | InjectableType<T>, value: T): void {
  if (typeof token === 'function') {
    token = getTypeToken(token);
  }

  const scope = getCurrentScope(GLOBAL_SCOPE);
  scope.set(token, value);
}
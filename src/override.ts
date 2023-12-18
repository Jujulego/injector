import { InjectableType } from './decorators/index.js';
import { InjectorScope, Token } from './defs/index.js';
import { globalScope$ } from './global-scope.js';
import { getTypeToken } from './utils/token.js';

export interface OverrideOpts {
  /**
   * Overrided scope, defaults to global scope.
   */
  scope?: InjectorScope;
}

/**
 * Overrides value injected from token by given value.
 */
export function override$<T>(token: Token<T> | InjectableType<T>, value: T, opts: OverrideOpts = {}): T {
  if (typeof token === 'function') {
    token = getTypeToken(token);
  }

  const scope = opts.scope ?? globalScope$();
  scope.set(token, value);

  return value;
}
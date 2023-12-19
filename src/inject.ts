import { Awaitable } from 'kyrielle';

import { InjectableType } from './decorators/index.js';
import { getTypeToken } from './utils/token.js';
import { InjectorScope, SyncToken, Token } from './defs/index.js';

export interface InjectOpts {
  /**
   * Scope to inject from. Defaults to global scope.
   */
  scope?: InjectorScope;
}

/**
 * Returns value for given token.
 */
export function inject$<T>(token: SyncToken<T> | InjectableType<T>, opts?: InjectOpts): T;

/**
 * Returns value for given token.
 */
export function inject$<T>(token: Token<T>, opts?: InjectOpts): Awaitable<T>;

export function inject$<T>(arg: Token<T> | InjectableType<T>, opts: InjectOpts = {}): Awaitable<T> {
  if (typeof arg === 'function') {
    arg = getTypeToken(arg);
  }

  return arg.inject(opts.scope);
}

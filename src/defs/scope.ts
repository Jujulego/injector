import { Mutable, Readable } from 'kyrielle';

import { Token } from './token.js';

// Types
export interface ScopeRef<T> extends Readable<T | undefined>, Mutable<T, T> {}

export interface InjectorScope {
  // Attributes
  readonly name: string;
  readonly parent: InjectorScope | null;

  // Methods
  ref<T>(token: Token<T>): ScopeRef<T>;

  get<T>(token: Token<T>): T | undefined;
  set<T>(token: Token<T>, obj: T): void;
  reset(): void;
}

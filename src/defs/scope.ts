import { Mutable, Readable } from 'kyrielle';

import { Token } from './token.js';

// Types
export interface ScopeRef<T> extends Readable<T | undefined>, Mutable<T, T> {}

export interface InjectorScope {
  // Attributes
  readonly name: string;
  readonly parent: InjectorScope | null;

  // Methods
  get<T>(token: Token<T>): T | undefined;
  set<T>(token: Token<T>, obj: T): void;
  ref<T>(token: Token<T>): ScopeRef<T>;
}

export interface ActiveScope extends Disposable, InjectorScope {
  // Attributes
  readonly isActive: boolean;
  readonly parent: InjectorScope;

  // Methods
  deactivate(): void;
}

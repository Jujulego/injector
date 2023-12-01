// Types
import { Token } from './token.js';

export interface InjectorScope {
  // Attributes
  readonly name: string;
  readonly parent: InjectorScope | null;

  // Methods
  get<T>(token: Token<T>): T | null;
  set<T>(token: Token<T>, obj: T, global?: boolean): void;
}

export interface ActiveScope extends Disposable, InjectorScope {
  // Attributes
  readonly isActive: boolean;
  readonly parent: InjectorScope;

  // Methods
  deactivate(): void;
}

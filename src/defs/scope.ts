// Types
export interface InjectorScope {
  // Attributes
  readonly name: string;
  readonly parent: InjectorScope | null;

  // Methods
  get<T>(key: symbol): T | null;
  set(key: symbol, obj: unknown, global?: boolean): void;
}

export interface ActiveScope extends Disposable, InjectorScope {
  // Attributes
  readonly isActive: boolean;
  readonly parent: InjectorScope;

  // Methods
  deactivate(): void;
}

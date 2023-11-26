// Types
export interface InjectorScope {
  // Attributes
  readonly name: string;
  readonly parent: InjectorScope | null;

  // Methods
  localGet<T>(key: symbol): T | null;
  localSet(key: symbol, obj: unknown): void;

  globalGet<T>(key: symbol): T | null;
  globalSet(key: symbol, obj: unknown): void;
}

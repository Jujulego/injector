import { InjectorScope } from '../defs/scope.js';

/**
 * Creates a new injector scope
 *
 * @param name
 */
export function _scope$(name: string): InjectorScope;

/**
 * Creates a new injector scope with given parent
 *
 * @param name
 * @param parent
 */
export function _scope$(name: string, parent: InjectorScope): InjectorScope & { readonly parent: InjectorScope };

export function _scope$(name: string, parent: InjectorScope | null = null): InjectorScope {
  const elements = new Map<symbol, unknown>();

  return {
    // Properties
    get name() {
      return name;
    },
    get parent() {
      return parent;
    },

    // Methods
    localGet<T>(key: symbol): T | null {
      if (elements.has(key)) {
        return elements.get(key) as T;
      }

      return null;
    },
    localSet(key: symbol, obj: unknown): void {
      elements.set(key, obj);
    },
    globalGet<T>(key: symbol): T | null {
      if (elements.has(key)) {
        return elements.get(key) as T;
      }

      if (this.parent) {
        return this.parent.globalGet(key);
      }

      return null;
    },
    globalSet(key: symbol, obj: unknown): void {
      if (!this.parent || elements.has(key)) {
        elements.set(key, obj);
      } else {
        this.parent.globalSet(key, obj);
      }
    }
  };
}
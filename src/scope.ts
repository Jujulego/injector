import { InjectorScope, ScopeRef } from './defs/scope.js';
import { Token } from './defs/token.js';
import { globalScope$ } from './global-scope.js';

/**
 * Creates a new injector scope with given parent
 *
 * @param name
 * @param parent defaults to global scope
 */
export function scope$(name: string, parent?: InjectorScope): InjectorScope & { readonly parent: InjectorScope };

/**
 * Creates a new injector scope with no parent
 *
 * @param name
 * @param parent
 */
export function scope$(name: string, parent: null): InjectorScope;

export function scope$(name: string, parent?: InjectorScope | null): InjectorScope {
  const elements = new Map<symbol, unknown>();

  return {
    // Properties
    get name() {
      return name;
    },
    get parent() {
      return parent === undefined ? globalScope$() : parent;
    },

    // Methods
    ref<T>(token: Token<T>): ScopeRef<T> {
      return {
        read: () => this.get(token),
        mutate: (obj: T) => {
          this.set(token, obj);
          return obj;
        }
      };
    },

    get<T>(token: Token<T>): T | undefined {
      if (elements.has(token.id)) {
        return elements.get(token.id) as T;
      }

      if (this.parent) {
        return this.parent.get<T>(token);
      }
    },
    set<T>(token: Token<T>, obj: T): void {
      elements.set(token.id, obj);
    },
    reset(): void {
      elements.clear();
    }
  };
}

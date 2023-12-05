import { InjectorScope, ScopeRef } from '../defs/scope.js';
import { Token } from '../defs/token.js';

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
    ref<T>(token: Token<T>): ScopeRef<T> {
      return {
        read: () => this.get(token),
        mutate: (obj: T) => {
          this.set(token, obj);
          return obj;
        }
      };
    }
  };
}

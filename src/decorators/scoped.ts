import { scope$ } from '../scope.js';
import { ActiveScope, SCOPE } from '../defs/index.js';

/**
 * Matches types that can be scoped
 */
export type ScopableType = new(...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Matches types that are scoped
 */
export interface ScopedType {
  readonly [SCOPE]: ActiveScope;
}

/**
 * Matches types that can be scoped
 */
export type ScopedClassDecorator = <T extends ScopableType>(target: T, ctx: ClassDecoratorContext<T>) => T;

/**
 * Make each instance of class live in its own scope.
 * All injected dependence will be stored within this scope, and so will be created for each instance of this class,
 * if they do not exist in a parent scope.
 */
export function Scoped(): ScopedClassDecorator {
  return <T extends ScopableType>(target: T): T => {
    let id = 0;

    return class extends target {
      // Attributes
      readonly [SCOPE]: ActiveScope;

      // Constructor
      constructor(...args: any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
        using scope = scope$(`${target.name}#${++id}`).activate();
        super(...args);

        this[SCOPE] = scope;
      }
    };
  };
}
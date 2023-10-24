/**
 * A type that can be constructed using "new".
 */
export interface NewableType<A extends unknown[], I> {
  // Constructor
  new (...args: A): I;

  // Attributes
  name?: string;
}

/**
 * Matches any newable type
 */
export type AnyType = NewableType<any[], unknown>; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Matches injectable types, newable types without arguments.
 */
export type InjectableType<T = unknown> = NewableType<[], T>;
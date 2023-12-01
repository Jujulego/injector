import { InjectableType } from '../decorators/index.js';

export function getMetadata<T>(type: InjectableType<T>) {
  return type[Symbol.metadata ?? Symbol('Symbol.metadata')] ??= {};
}
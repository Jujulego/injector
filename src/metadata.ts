import { AnyType } from './defs/index.js';

// Utils
export function defineMetadata(target: AnyType, key: symbol, value: unknown) {
  if (Symbol.metadata) {
    const metadata = target[Symbol.metadata];

    if (metadata) {
      return metadata[key] = value;
    }
  }

  Reflect.defineMetadata(key, value, target);
}

export function getMetadata<T>(target: AnyType, key: symbol): T | undefined {
  if (Symbol.metadata) {
    const metadata = target[Symbol.metadata];

    if (metadata) {
      return metadata[key] as T | undefined;
    }
  }

  return Reflect.getMetadata(key, target);
}

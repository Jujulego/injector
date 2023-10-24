import { InjectableType } from '../defs/index.js';

// Types
export type InjectInitializer<I> = () => I;
export type InjectDecorator<I> = <T>(target: undefined, ctx: ClassFieldDecoratorContext<T, I>) => InjectInitializer<I>;

// Decorator
export function Inject<I>(cls: InjectableType<I>): InjectDecorator<I> {
  return () => () => new cls();
}
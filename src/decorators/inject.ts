import { InjectableType } from '../defs/index.js';

// Types
export type InjectInitializer<I> = () => I;

export type InjectAccessorDecorator<I> = <T>(target: ClassAccessorDecoratorTarget<T, I>, ctx: ClassAccessorDecoratorContext<T, I>) => ClassAccessorDecoratorResult<T, I>;
export type InjectFieldDecorator<I> = <T>(target: undefined, ctx: ClassFieldDecoratorContext<T, I>) => InjectInitializer<I>;
export type InjectDecorator<I> = InjectAccessorDecorator<I> | InjectFieldDecorator<I>;

// Decorator
export function Inject<I>(cls: InjectableType<I>): InjectDecorator<I> {
  return <InjectDecorator<I>>((_target: unknown, ctx: ClassAccessorDecoratorContext<unknown, I> | ClassFieldDecoratorContext<unknown, I>) => {
    if (ctx.kind === 'field') {
      return () => new cls();
    } else {
      return {
        init: () => new cls(),
      };
    }
  });
}
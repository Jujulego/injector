import { InjectableType } from '../defs/index.js';

// Types
export type InjectInitializer<I> = () => I;

export type InjectTarget<T, I> = undefined | ClassAccessorDecoratorTarget<T, I>;
export type InjectContext<T, I> = ClassFieldDecoratorContext<T, I> | ClassAccessorDecoratorContext<T, I>;
export type InjectResult<T, I> = InjectInitializer<I> & ClassAccessorDecoratorResult<T, I>;

export type InjectDecorator<I> = <T>(target: InjectTarget<T, I>, ctx: InjectContext<T, I>) => InjectResult<T, I>;

// Decorator
export function Inject<I>(cls: InjectableType<I>): InjectDecorator<I> {
  return (_target: InjectTarget<unknown, I>, ctx: InjectContext<unknown, I>): InjectResult<unknown, I> => {
    const init: InjectInitializer<I> = () => new cls();

    if (ctx.kind === 'accessor') {
      return ({
        init,
        set() {
          throw new Error(`Cannot set injected accessor ${String(ctx.name)}`);
        },
      }) as unknown as InjectResult<unknown, I>;
    }

    return init;
  };
}

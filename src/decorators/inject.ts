import { InjectableType } from '../defs/index.js';
import { inject$ } from '../inject.js';

// Types
export interface InjectOpts {
  lazy?: boolean;
}

export type InjectInitializer<I> = () => I;

export type InjectFieldDecorator<I> = <T>(target: undefined, ctx: ClassFieldDecoratorContext<T, I>) => InjectInitializer<I>;
export type InjectAccessorDecorator<I> = <T>(target: ClassAccessorDecoratorTarget<T, I>, ctx: ClassAccessorDecoratorContext<T, I>) => ClassAccessorDecoratorResult<T, I>;

export type InjectDecorator<I> = InjectFieldDecorator<I> | InjectAccessorDecorator<I>;

// Decorator
export function Inject<I>(cls: InjectableType<I>, opts?: { lazy?: false }): InjectFieldDecorator<I>;
export function Inject<I>(cls: InjectableType<I>, opts: { lazy: true }): InjectAccessorDecorator<I>;

export function Inject<I>(type: InjectableType<I>, opts: InjectOpts = {}): InjectDecorator<I> {
  return <InjectDecorator<I>>((target: undefined | ClassAccessorDecoratorTarget<unknown, I>, ctx: ClassFieldDecoratorContext<unknown, I> | ClassAccessorDecoratorContext<unknown, I>) => {
    if (ctx.kind === 'accessor' && opts.lazy) {
      return {
        get() {
          let instance = target!.get.call(this);

          if (instance === undefined) {
            instance = inject$(type);
            target!.set.call(this, instance);
          }

          return instance;
        },
        set() {
          throw new Error(`Cannot set lazy injected accessor ${String(ctx.name)}`);
        },
      };
    }

    return () => inject$(type);
  });
}

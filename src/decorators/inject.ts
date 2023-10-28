import { InjectableType, SyncToken } from '../defs/index.js';
import { inject$ } from '../inject.js';

// Types
export interface InjectOpts {
  lazy?: boolean;
}

export type InjectInitializer<I> = () => I;

export type InjectFieldDecorator<I> = <T>(target: undefined, ctx: ClassFieldDecoratorContext<T, I>) => InjectInitializer<I>;
export type InjectAccessorDecorator<I> = <T>(target: ClassAccessorDecoratorTarget<T, I>, ctx: ClassAccessorDecoratorContext<T, I>) => ClassAccessorDecoratorResult<T, I>;

export type InjectDecorator<I> = InjectFieldDecorator<I> | InjectAccessorDecorator<I>;

/**
 * Inject service instance into the decorated field, using `inject$`.
 *
 * ```typescript
 * class ToInject {}
 *
 * class Example {
 *   @Inject(ToInject)
 *   readonly toInject: ToInject;
 * }
 * ```
 *
 * @param type Service to inject
 * @param opts
 */
export function Inject<I>(type: InjectableType<I> | SyncToken<I>, opts?: { lazy?: false }): InjectFieldDecorator<I>;

/**
 * Lazily inject service instance into the decorated accessor, using `inject$`.
 *
 * ```typescript
 * class ToInject {}
 *
 * class Example {
 *   @Inject(ToInject, { lazy: true })
 *   accessor toInject: ToInject;
 * }
 * ```
 *
 * @param type Service to inject
 * @param opts
 */
export function Inject<I>(type: InjectableType<I> | SyncToken<I>, opts: { lazy: true }): InjectAccessorDecorator<I>;

export function Inject<I>(type: InjectableType<I> | SyncToken<I>, opts: InjectOpts = {}): InjectDecorator<I> {
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

import { SyncToken } from '../defs/index.js';
import { inject$, InjectOpts } from '../inject.js';
import { InjectableType } from './injectable.js';

// Types
export interface InjectDecoratorOpts extends InjectOpts {
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
export function Inject<T>(type: SyncToken<T> | InjectableType<T>, opts?: { lazy?: false } & InjectOpts): InjectFieldDecorator<T>;

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
export function Inject<T>(type: SyncToken<T> | InjectableType<T>, opts: { lazy: true } & InjectOpts): InjectAccessorDecorator<T>;

export function Inject<T>(type: SyncToken<T> | InjectableType<T>, opts: InjectDecoratorOpts = {}): InjectDecorator<T> {
  return <InjectDecorator<T>>((target: undefined | ClassAccessorDecoratorTarget<unknown, T>, ctx: ClassFieldDecoratorContext<unknown, T> | ClassAccessorDecoratorContext<unknown, T>) => {
    if (ctx.kind === 'accessor' && opts.lazy) {
      return {
        get() {
          let instance = target!.get.call(this);

          if (instance === undefined) {
            instance = inject$<T>(type, opts);
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

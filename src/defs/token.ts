import { Awaitable } from 'kyrielle';
import { InjectorScope } from './scope.js';

export interface Token<T> {
  readonly id: symbol;

  inject(scope?: InjectorScope): Awaitable<T>;
}

export interface SyncToken<T> {
  readonly id: symbol;

  inject(scope?: InjectorScope): T;
}

import { InjectorScope } from '@jujulego/injector';

export function getCurrentScope(global: InjectorScope): InjectorScope;
export function setCurrentScope(scope: InjectorScope): void;

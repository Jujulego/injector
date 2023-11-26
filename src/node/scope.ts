import { _scope$ } from '../bases/index.js';
import { ActiveScope, InjectorScope } from '../defs/index.js';
import { getCurrentScope, setCurrentScope } from './globals.js';

export function scope$(name: string): ActiveScope;
export function scope$(name: string, parent: InjectorScope): ActiveScope;
export function scope$(name: string, parent?: InjectorScope): ActiveScope {
  parent ??= getCurrentScope();

  const scope = _scope$(name, parent);
  setCurrentScope(scope);

  return Object.assign(scope, {
    // Properties
    get isActive() {
      return getCurrentScope() === scope;
    },

    // Methods
    deactivate() {
      setCurrentScope(parent!);
    },
    [Symbol.dispose]() {
      setCurrentScope(parent!);
    }
  });
}
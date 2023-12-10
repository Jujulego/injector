import { getCurrentScope } from '#history';

import { Scoped, ScopedType } from '@/src/decorators/scoped.js';
import { Inject } from '@/src/decorators/inject.js';
import { SCOPE } from '@/src/defs/symbols.js';
import { getTypeToken } from '@/src/utils/token.js';
import { GLOBAL_SCOPE } from '@/src/globals.js';
import { inject$ } from '@/src/inject.js';

// Utils
class Deps {}

const depsToken = getTypeToken(Deps);

// Tests
describe('@Scoped', () => {
  it('should create injected instances within a scope created for the instance', () => {
    @Scoped()
    class Test {
      @Inject(Deps) readonly deps: Deps;
    }

    const test = new Test();
    expect(test.deps).toBeInstanceOf(Deps);

    const scope = (test as Test & ScopedType)[SCOPE];
    expect(scope).toBeDefined();
    expect(scope.get(depsToken)).toBe(test.deps);
    expect(GLOBAL_SCOPE.get(depsToken)).toBeUndefined();

    expect(getCurrentScope(GLOBAL_SCOPE)).toBe(GLOBAL_SCOPE);
  });

  it('should create injected values within a scope created for the instance', () => {
    @Scoped()
    class Test {
      readonly deps = inject$(Deps);
    }

    const test = new Test();
    expect(test.deps).toBeInstanceOf(Deps);

    const scope = (test as Test & ScopedType)[SCOPE];
    expect(scope).toBeDefined();
    expect(scope.get(depsToken)).toBe(test.deps);
    expect(GLOBAL_SCOPE.get(depsToken)).toBeUndefined();

    expect(getCurrentScope(GLOBAL_SCOPE)).toBe(GLOBAL_SCOPE);
  });
});
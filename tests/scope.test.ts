import { getCurrentScope } from '#history';
import { GLOBAL_SCOPE } from '@/src/globals.js';
import { scope$ } from '@/src/scope.js';

// Tests
describe('scope$', () => {
  it('should create and activate scope', () => {
    using scope = scope$('test').activate();

    expect(scope.isActive).toBe(true);
    expect(scope.parent).toBe(GLOBAL_SCOPE);
    expect(getCurrentScope(GLOBAL_SCOPE)).toBe(scope);
  });

  it('should deactivate scope', () => {
    const scope = scope$('test');
    scope.deactivate();

    expect(scope.isActive).toBe(false);
    expect(scope.parent).toBe(GLOBAL_SCOPE);
    expect(getCurrentScope(GLOBAL_SCOPE)).toBe(GLOBAL_SCOPE);
  });
});
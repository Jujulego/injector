import { GLOBAL_SCOPE } from '@/src/globals.js';
import { token$ } from '@/src/token.js';
import { scope$ } from '@/src/scope.js';

// Tests
describe('token$', () => {
  it('should return object created by fn, and store it in global scope', () => {
    const token = token$(() => ({ life: 42 }));

    expect(token.read()).toStrictEqual({ life: 42 });
    expect(GLOBAL_SCOPE.get(token.id)).toStrictEqual({ life: 42 });
  });

  it('should store object in active scope', () => {
    using scope = scope$('test');
    const token = token$(() => ({ life: 42 }));

    token.read();

    expect(scope.get(token.id)).toStrictEqual({ life: 42 });
    expect(GLOBAL_SCOPE.get(token.id)).toBeNull();
  });

  it('should call fn only once', () => {
    const fn = vi.fn(() => ({ life: 42 }));
    const token = token$(fn);

    token.read();
    token.read();
    token.read();

    expect(fn).toHaveBeenCalledOnce();
  });

  it('should return the same instance', () => {
    const token = token$(() => ({ life: 42 }));

    expect(token.read()).toStrictEqual(token.read());
  });
});

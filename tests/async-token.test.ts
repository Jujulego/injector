import { GLOBAL_SCOPE } from '@/src/globals.js';
import { asyncToken$ } from '@/src/async-token.js';
import { scope$ } from '@/src/scope.js';

// Tests
describe('asyncToken$', () => {
  it('should return object created by fn, and store it in global scope', async () => {
    const token = asyncToken$(async () => ({ life: 42 }));

    await expect(token.read()).resolves.toStrictEqual({ life: 42 });
    expect(GLOBAL_SCOPE.get(token.id)).toStrictEqual({ life: 42 });
  });

  it('should store object in active scope', async () => {
    using scope = scope$('test');
    const token = asyncToken$(async () => ({ life: 42 }));

    await token.read();

    expect(scope.get(token.id)).toStrictEqual({ life: 42 });
    expect(GLOBAL_SCOPE.get(token.id)).toBeNull();
  });

  it('should call fn only once', async () => {
    const fn = vi.fn(async () => ({ life: 42 }));
    const token = asyncToken$(fn);

    await Promise.all([
      token.read(),
      token.read(),
      token.read(),
    ]);

    expect(fn).toHaveBeenCalledOnce();
  });

  it('should return the same instance', async () => {
    const token = asyncToken$(async () => ({ life: 42 }));

    await expect(token.read()).resolves.toStrictEqual(await token.read());
  });
});

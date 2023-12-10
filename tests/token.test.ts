import { GLOBAL_SCOPE } from '@/src/globals.js';
import { token$ } from '@/src/token.js';
import { scope$ } from '@/src/scope.js';

// Tests
describe('token$', () => {
  it('should store object in active scope', () => {
    const token = token$(() => ({ life: 42 }));
    using scope = scope$('test').activate();

    token.read();

    expect(scope.get(token)).toStrictEqual({ life: 42 });
    expect(GLOBAL_SCOPE.get(token)).toBeUndefined();
  });

  describe('sync fn', () => {
    it('should return object created by fn, and store it in global scope', () => {
      const token = token$(() => ({ life: 42 }));

      expect(token.read()).toStrictEqual({ life: 42 });
      expect(GLOBAL_SCOPE.get(token)).toStrictEqual({ life: 42 });
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

  describe('async fn', () => {
    it('should return object created by fn, and store it in global scope', async () => {
      const token = token$(async () => ({ life: 42 }));

      await expect(token.read()).resolves.toStrictEqual({ life: 42 });
      expect(GLOBAL_SCOPE.get(token)).toStrictEqual({ life: 42 });
    });

    it('should call fn only once', async () => {
      const fn = vi.fn(async () => ({ life: 42 }));
      const token = token$(fn);

      await Promise.all([
        token.read(),
        token.read(),
        token.read(),
      ]);

      expect(fn).toHaveBeenCalledOnce();
    });

    it('should return the same instance', async () => {
      const token = token$(async () => ({ life: 42 }));

      await expect(token.read()).resolves.toStrictEqual(await token.read());
    });
  });
});

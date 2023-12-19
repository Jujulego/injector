import { describe, expect, it, vi } from 'vitest';

import { token$ } from '@/src/token.js';

// Tests
describe('token$', () => {
  describe('sync fn', () => {
    it('should return object created by fn', () => {
      const token = token$(() => ({ life: 42 }));

      expect(token.inject()).toStrictEqual({ life: 42 });
    });

    it('should call fn only once', () => {
      const fn = vi.fn(() => ({ life: 42 }));
      const token = token$(fn);

      token.inject();
      token.inject();
      token.inject();

      expect(fn).toHaveBeenCalledOnce();
    });

    it('should return the same instance', () => {
      const token = token$(() => ({ life: 42 }));

      expect(token.inject()).toStrictEqual(token.inject());
    });
  });

  describe('async fn', () => {
    it('should return object created by fn', async () => {
      const token = token$(async () => ({ life: 42 }));

      await expect(token.inject()).resolves.toStrictEqual({ life: 42 });
    });

    it('should call fn only once', async () => {
      const fn = vi.fn(async () => ({ life: 42 }));
      const token = token$(fn);

      await Promise.all([
        token.inject(),
        token.inject(),
        token.inject(),
      ]);

      expect(fn).toHaveBeenCalledOnce();
    });

    it('should return the same instance', async () => {
      const token = token$(async () => ({ life: 42 }));

      await expect(token.inject()).resolves.toStrictEqual(await token.inject());
    });
  });
});

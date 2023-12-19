import { beforeEach, describe, expect, it } from 'vitest';

import { globalScope$ } from '@/src/global-scope.js';
import { inject$ } from '@/src/inject.js';
import { token$ } from '@/src/token.js';

// Setup
beforeEach(() => {
  globalScope$().reset();
});

// Tests
describe('inject$', () => {
  it('should return a stable instance of type', () => {
    class Test {}

    expect(inject$(Test)).toBeInstanceOf(Test);
    expect(inject$(Test)).toBe(inject$(Test));
  });

  it('should return a stable value created by token (sync)', () => {
    const life = token$(() => ({ life: 42 }));

    expect(inject$(life)).toStrictEqual({ life: 42 });
    expect(inject$(life)).toBe(inject$(life));
  });

  it('should return a stable value created by token (async)', async () => {
    const life = token$(async () => ({ life: 42 }));

    await expect(inject$(life)).resolves.toStrictEqual({ life: 42 });
    expect(inject$(life)).toBe(inject$(life)); // <= next calls are cached so no more promises
  });
});
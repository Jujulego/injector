import { Awaitable } from 'kyrielle';
import { describe, expectTypeOf, it } from 'vitest';

import { inject$ } from '@/src/inject.js';
import { token$ } from '@/src/token.js';

// Tests
describe('inject$', () => {
  it('should be synchronous for injectable type', () => {
    class Test {}

    expectTypeOf(inject$(Test)).toEqualTypeOf<Test>();
  });

  it('should be synchronous for synchronous token', () => {
    const life = token$(() =>  42);

    expectTypeOf(inject$(life)).toEqualTypeOf<number>();
  });

  it('should be awaitable for asynchronous token', () => {
    const life = token$(async () =>  42);

    expectTypeOf(inject$(life)).toEqualTypeOf<Awaitable<number>>();
  });
});
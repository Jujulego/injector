import { beforeEach, describe, expect, it } from 'vitest';

import { globalScope$ } from '@/src/global-scope.js';
import { token$ } from '@/src/token.js';
import { override$ } from '@/src/override.js';
import { scope$ } from '@/src/scope.js';

// Setup
beforeEach(() => {
  globalScope$().reset();
});

// Tests
describe('override$', () => {
  it('should replace value injected by token', () => {
    const life = token$(() => ({ life: 42 }));
    override$(life, { life: 12 });

    expect(life.inject()).toStrictEqual({ life: 12 });
  });

  it('should replace value injected by token in given scope', () => {
    const life = token$(() => ({ life: 42 }));
    const scope = scope$('test');

    override$(life, { life: 12 }, { scope });

    expect(life.inject()).toStrictEqual({ life: 42 });
    expect(life.inject(scope)).toStrictEqual({ life: 12 });
  });
});
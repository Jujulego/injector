import { const$, SyncRef } from '@jujulego/aegis';
import { beforeEach, vi } from 'vitest';

import { Injectable } from '@/src/decorators/injectable.js';
import { STORE } from '@/src/defs/symbols.js';
import { getMetadata } from '@/src/metadata.js';

// Setup
const store = const$(null);
const test$ = vi.fn<[() => unknown], SyncRef>(() => store);

beforeEach(() => {
  test$.mockClear();
});

// Tests
describe('@Injectable', () => {
  it('should add given store to class metadata', () => {
    @Injectable({ store: test$ })
    class TestService {}

    expect(getMetadata(TestService, STORE)).toBe(store);

    expect(test$).toHaveBeenCalledOnce();
    expect(test$.mock.calls[0]![0]()).toBeInstanceOf(TestService);
  });
});
import { const$ } from 'kyrielle/refs';
import { beforeEach, vi } from 'vitest';

import { Injectable } from '@/src/decorators/injectable.js';
import { TOKEN } from '@/src/defs/symbols.js';
import { getMetadata } from '@/src/metadata.js';
import { token$ } from '@/src/token.js';

// Setup
const store = const$(null);

vi.mock('@/src/token.js');

beforeEach(() => {
  vi.mocked(token$).mockClear();
  vi.mocked(token$).mockReturnValue(store);
});

// Tests
describe('@Injectable', () => {
  it('should add given store to class metadata', () => {
    @Injectable()
    class TestService {}

    expect(getMetadata(TestService, TOKEN)).toBe(store);

    expect(token$).toHaveBeenCalledOnce();
    expect(vi.mocked(token$).mock.calls[0]![0]()).toBeInstanceOf(TestService);
  });
});

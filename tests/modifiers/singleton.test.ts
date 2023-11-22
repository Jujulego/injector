import { pipe$ } from 'kyrielle/operators';
import { vi } from 'vitest';

import { SyncToken } from '@/src/defs/token.js';
import { singleton$ } from '@/src/modifiers/singleton.js';
import { token$ } from '@/src/token.js';

// Setup
let token: SyncToken<{ life: number }>;

beforeEach(() => {
  token = token$(() => ({ life: 42 }));
  vi.spyOn(token, 'read');
});

// Tests
describe('singleton$', () => {
  it('should return data read from token', () => {
    const result = pipe$(token, singleton$());

    expect(result.read()).toStrictEqual({ life: 42 });
    expect(token.read).toHaveBeenCalled();
  });

  it('should always return the same object, while reading token only once', () => {
    const result = pipe$(token, singleton$());

    expect(result.read()).toBe(result.read());
    expect(token.read).toHaveBeenCalledOnce();
  });
});

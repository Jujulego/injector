import { expect, vi } from 'vitest';

import { singleton$ } from '@/src/stores/singleton.js';

// Setup
class TestService {}

let factory: () => TestService;

beforeEach(() => {
  factory = vi.fn(() => new TestService());
});

// Tests
describe('singleton$', () => {
  it('should return an instance of TestService and call factory lazily', () => {
    const store = singleton$(factory);
    expect(factory).not.toHaveBeenCalled();

    expect(store.read()).toBeInstanceOf(TestService);
    expect(factory).toHaveBeenCalled();
  });

  it('should always return the same instance of TestService and call factory once', () => {
    const store = singleton$(factory);

    expect(store.read()).toBe(store.read());
    expect(factory).toHaveBeenCalledOnce();
  });
});

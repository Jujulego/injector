import { beforeEach, vi } from 'vitest';

import { Inject } from '@/src/decorators/inject.js';
import { inject$ } from '@/src/inject.js';

// Mocks
vi.mock('@/src/inject.js');

// Setup
class TestService {}

beforeEach(() => {
  vi.mocked(inject$).mockClear();
  vi.mocked(inject$).mockReturnValue(new TestService());
});

// Tests
describe('@Inject', () => {
  it('should inject new instance of service in field', () => {
    const test = new class {
      @Inject(TestService)
      readonly service: TestService;
    };

    expect(inject$).toHaveBeenCalledWith(TestService);

    expect(test.service).toBeInstanceOf(TestService);

    expect(inject$).toHaveBeenCalledOnce();
  });

  it('should inject new instance of service in accessor field', () => {
    const test = new class {
      @Inject(TestService, { lazy: true })
      accessor service: TestService;
    };

    expect(inject$).not.toHaveBeenCalled();

    expect(test.service).toBeInstanceOf(TestService);
    expect(test.service).toBeInstanceOf(TestService);

    expect(inject$).toHaveBeenCalledOnce();
    expect(inject$).toHaveBeenCalledWith(TestService);
  });

  it('should prevent change of injected accessor', () => {
    const test = new class {
      @Inject(TestService, { lazy: true })
      accessor service: TestService;
    };

    expect(() => test.service = new TestService()).toThrowError('Cannot set lazy injected accessor service');
  });
});

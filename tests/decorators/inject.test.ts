import { Inject } from '@/src/decorators/inject.js';

// Tests
describe('@Inject', () => {
  it('should inject new instance of service in field', () => {
    const spy = vi.fn();

    class TestService {
      constructor() { spy(); }
    }

    const test = new class {
      @Inject(TestService)
      readonly service: TestService;
    };

    expect(spy).toHaveBeenCalled();

    expect(test.service).toBeInstanceOf(TestService);

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should inject new instance of service in accessor field', () => {
    const spy = vi.fn();

    class TestService {
      constructor() { spy(); }
    }

    const test = new class {
      @Inject(TestService, { lazy: true })
      accessor service: TestService;
    };

    expect(spy).not.toHaveBeenCalled();

    expect(test.service).toBeInstanceOf(TestService);
    expect(test.service).toBeInstanceOf(TestService);

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should prevent change of injected accessor', () => {
    class TestService {}

    const test = new class {
      @Inject(TestService, { lazy: true })
      accessor service: TestService;
    };

    expect(() => test.service = new TestService()).toThrowError('Cannot set lazy injected accessor service');
  });
});

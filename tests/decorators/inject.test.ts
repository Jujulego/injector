import { Inject } from '@/src/decorators/inject.js';

// Tests
describe('@Inject', () => {
  it('should inject new instance of service in field', () => {
    class TestService {}

    const test = new class {
      @Inject(TestService)
      readonly service: TestService;
    };

    expect(test.service).toBeInstanceOf(TestService);
  });

  it('should inject new instance of service in accessor field', () => {
    class TestService {}

    const test = new class {
      @Inject(TestService)
      accessor service: TestService;
    };

    expect(test.service).toBeInstanceOf(TestService);
  });

  it('should prevent change of injected accessor', () => {
    class TestService {}

    const test = new class {
      @Inject(TestService)
      accessor service: TestService;
    };

    expect(() => test.service = new TestService()).toThrowError('Cannot set injected accessor service');
  });
});

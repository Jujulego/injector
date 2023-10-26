import { Service } from '@/src/decorators/service.js';
import { inject$ } from '@/src/inject.js';

import { overrideInject$ } from '@/src/tests/override-inject.js';

// Tests
describe('overrideInject$', () => {
  it('should return given value instead of class instance', () => {
    class TestService {
      life = 1;
    }

    overrideInject$(TestService, { life: 42 });

    expect(inject$(TestService)).toStrictEqual({ life: 42 });
  });

  it('should return given value instead of service instance', () => {
    @Service()
    class TestService {
      life = 1;
    }

    overrideInject$(TestService, { life: 42 });

    expect(inject$(TestService)).toStrictEqual({ life: 42 });
  });
});
import { inject$ } from '@/src/inject.js';

// Tests
describe('inject$', () => {
  it('should return new instance of service', () => {
    class TestService {}

    expect(inject$(TestService)).toBeInstanceOf(TestService);
  });
});

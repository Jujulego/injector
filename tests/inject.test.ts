import { inject$ } from '@/src/inject.js';
import { Injectable } from '@/src/decorators/injectable.js';
import { singleton$ } from '@/src/modifiers/singleton.js';

// Tests
describe('inject$', () => {
  it('should return new instance of service', () => {
    class TestService {}

    expect(inject$(TestService)).toBeInstanceOf(TestService);
  });

  it('should always return the same instance of service', () => {
    @Injectable({ modifiers: [singleton$()] })
    class TestService {}

    expect(inject$(TestService)).toBeInstanceOf(TestService);
    expect(inject$(TestService)).toBe(inject$(TestService));
  });
});

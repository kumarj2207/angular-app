import { Credit } from './credit';

describe('Credit', () => {
  it('should create an instance', () => {
    expect(new Credit(1, 'AHPPJ5588C', 5)).toBeTruthy();
  });
});

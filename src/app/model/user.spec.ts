import { User } from './user';
import { Role } from './role.enum';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('Roger', 'admin@mydiet.com', 'admin123', Role.ADMIN)).toBeTruthy();
  });
});

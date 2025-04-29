import { JwtAuthGuard } from '../auth/jwt.guard';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});

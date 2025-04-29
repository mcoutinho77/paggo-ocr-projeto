import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'mocked_token' }),
            register: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            createUser: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AuthService.login and return a token', async () => {
    const result = await controller.login({ username: 'test', password: 'test' });
    expect(result).toEqual({ access_token: 'mocked_token' });
  });

  it('should call AuthService.register and return a success message', async () => {
    const result = await controller.register({
      username: 'test',
      email: 'test@example.com',
      password: 'test',
    });
    expect(result).toEqual({ message: 'User registered successfully' });
  });
});
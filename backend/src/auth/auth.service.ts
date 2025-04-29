import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Encontre o usuário pelo nome de usuário
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Verifique se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Gere o JWT com a ID do usuário
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Verifique se o usuário já existe
    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Usuário já existe');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie o usuário
    const user = await this.userService.createUser({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
    });

    return {
      message: 'Usuário registrado com sucesso',
      user,
    };
  }
}
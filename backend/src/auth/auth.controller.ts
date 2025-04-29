// src/auth/auth.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: { username: string; email: string; password: string }) {
    if (await this.userService.findOne(dto.username)) {
      throw new BadRequestException('Username já em uso');
    }
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      email: dto.email,
      username: dto.username,
      password: hash,
    });
    return user; // Retorna o objeto completo do usuário
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }  
}

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token de autenticação ausente.');
    }

    try {
      // Valida e decodifica o token JWT
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Certifique-se de que JWT_SECRET está definido no .env
      });

      // Adiciona os dados do usuário ao objeto `req` para uso posterior
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token de autenticação inválido ou expirado.');
    }
  }
}
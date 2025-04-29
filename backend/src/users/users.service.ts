// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async findOne(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser(data: { username: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }
}

import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma:PrismaService){}
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) return null;

    return new User(user.id, user.name, user.email, user.password_hash);
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.usuario.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.passwordHash,
      },
    });

    return new User(
      created.id,
      created.name,
      created.email,
      created.password_hash,
    );
  }
}
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        telephone: {
          create: data.telephone,
        },
      },
      include: { telephone: true },
    });
  }

  async findByCpfCnpj(cpf_cnpj: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { cpf_cnpj },
    });
  }
}

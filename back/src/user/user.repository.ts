import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUser(cpf_cnpj: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { cpf_cnpj },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        site: data.site,
        telephone: data.telephone
          ? {
              upsert: data.telephone.map((tel) => ({
                where: { number: tel.number },
                create: {
                  number: tel.number,
                },
                update: {
                  number: tel.number,
                },
              })),
            }
          : undefined,
      },
      include: { telephone: true },
    });
  }
}

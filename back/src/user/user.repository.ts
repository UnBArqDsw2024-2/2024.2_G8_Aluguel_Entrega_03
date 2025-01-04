import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserBuilder } from './dto/update-user.builder';
import { CPFValidationStrategy } from './strategies/cpf-validation.strategy';
import { TelephoneAdapter } from './adapters/telephone.adapter';
import { UpdateStrategy } from './strategies/update-strategy.interface';
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
    // 1. Strategy: Validação de CPF
    const validationStrategy: UpdateStrategy = new CPFValidationStrategy();
    validationStrategy.execute(cpf_cnpj);

    // 2. Builder: Configuração de UpdateUserDto
    const builder = new UpdateUserBuilder();
    const userData = builder
      .setName(data.name)
      .setEmail(data.email)
      .setPassword(data.password)
      .setSite(data.site)
      .setTelephones(data.telephone)
      .build();

    // 3. Adapter: Normalização de Telefones
    const adaptedTelephones = userData.telephone
    ? TelephoneAdapter.adapt(userData.telephone)
    : undefined;

    // Atualização no banco de dados
    return this.prisma.user.update({
      where: { cpf_cnpj },
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        site: userData.site,
        telephone: adaptedTelephones
          ? {
              upsert: adaptedTelephones.map((tel) => ({
                where: { number: tel.number },
                create: { number: tel.number },
                update: { number: tel.number },
              })),
            }
          : undefined,
      },
      include: { telephone: true },
    });
  }
}

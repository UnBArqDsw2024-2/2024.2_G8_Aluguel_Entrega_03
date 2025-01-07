import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelephoneAdapter } from './adapters/telephone.adapter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CPFValidationStrategy } from './strategies/cpf-validation.strategy';
import { UpdateStrategy } from './strategies/update-strategy.interface';
import { LogOnErrorUtil } from './decorators/user.method-logger';

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

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByCpfCnpj(cpf_cnpj: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { cpf_cnpj },
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUser(cpf_cnpj: string, data: UpdateUserDto): Promise<User> {
    // 1. Strategy: Validação de CPF
    const validationStrategy: UpdateStrategy = new CPFValidationStrategy();
    validationStrategy.execute(cpf_cnpj);

    // 2. Adapter: Normalização de Telefones
    const adaptedTelephones = data.telephone
      ? TelephoneAdapter.adapt(data.telephone)
      : undefined;

    return this.prisma.user.update({
      where: { cpf_cnpj },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        site: data.site,
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

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByResetToken(token: string) {
    return this.prisma.user.findFirst({
      where: { reset_password_token: token },
    });
  }

  async updateResetToken(
    userId: string,
    token: string | null,
    expires: Date | null,
  ) {
    return this.prisma.user.update({
      where: { cpf_cnpj: userId },
      data: {
        reset_password_token: token,
        reset_password_expires: expires,
      },
    });
  }

  async updatePassword(userId: string, hashedPassword: string) {
    return this.prisma.user.update({
      where: { cpf_cnpj: userId },
      data: {
        password: hashedPassword,
      },
    });
  }

  @LogOnErrorUtil.create()
  async deleteUser(cpf_cnpj: string): Promise<User> {
    await this.prisma.telephone.deleteMany({
      where: { userId: cpf_cnpj },
    });

    const deletedUser = await this.prisma.user.delete({
      where: { cpf_cnpj: cpf_cnpj },
    });

    return deletedUser;
  }
}

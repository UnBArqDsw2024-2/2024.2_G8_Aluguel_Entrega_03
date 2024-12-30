import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';
import { CNPJValidation } from './validation/cnpj.validation';
import { CPFValidation } from './validation/cpf.validation';
import { ValidationService } from './validation/validation.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<UserResponseDto> {
    const validationService = new ValidationService();

    validationService.setStrategy(
      data.cpf_cnpj.length === 11 ? new CPFValidation() : new CNPJValidation(),
    );

    if (!validationService.validate(data.cpf_cnpj)) {
      throw new BadRequestException('CPF/CNPJ inválido');
    }

    const existingUser = await this.userRepository.findByCpfCnpj(data.cpf_cnpj);
    if (existingUser) {
      throw new BadRequestException('CPF/CNPJ já cadastrado');
    }

    const encryptedPassword = await bcrypt.hash(data.password, 10);

    const user = UserFactory.createUser({
      ...data,
      password: encryptedPassword,
    });

    const createdUser = await this.userRepository.createUser(user);

    const userResponse: UserResponseDto = {
      name: createdUser.name,
      cpf_cnpj: createdUser.cpf_cnpj,
      email: createdUser.email,
      site: createdUser.site,
    };

    return userResponse;
  }

  async updateUser(
    cpf_cnpj: string,
    data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findByCpfCnpj(cpf_cnpj);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.updateUser(cpf_cnpj, data);

    const userResponse: UserResponseDto = {
      name: updatedUser.name,
      cpf_cnpj: updatedUser.cpf_cnpj,
      email: updatedUser.email,
      site: updatedUser.site,
    };

    return userResponse;
  }
}

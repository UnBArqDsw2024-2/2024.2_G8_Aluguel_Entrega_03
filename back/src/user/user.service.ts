import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationService } from './validation/validation.service';
import * as bcrypt from 'bcrypt';
import { UserFactory } from './user.factory';
import { CPFValidation } from './validation/cpf.validation';
import { CNPJValidation } from './validation/cnpj.validation';
import { UserResponseDto } from './dto/user-response.dto';

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
}

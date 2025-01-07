import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserResponseDto,
  UserResponseDtoBuilder,
} from './dto/user-response.dto';
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

    const telephones = data.telephone || [];

    const telephoneEntities = telephones.map((telephone) => {
      telephone.number = data.telephone[0].number;
      telephone.userId = data.cpf_cnpj;
      return telephone;
    });

    const user = UserFactory.createUser({
      ...data,
      telephone: telephoneEntities,
      password: encryptedPassword,
    });

    const createdUser = await this.userRepository.createUser(user);

    const builder = new UserResponseDtoBuilder();

    const userResponse = builder
      .setName(createdUser.name)
      .setCpfCnpj(createdUser.cpf_cnpj)
      .setEmail(createdUser.email)
      .setSite(createdUser.site)
      .build();

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

    const builder = new UserResponseDtoBuilder();

    const userResponse = builder
      .setName(updatedUser.name)
      .setCpfCnpj(updatedUser.cpf_cnpj)
      .setEmail(updatedUser.email)
      .setSite(updatedUser.site)
      .build();

    return userResponse;
  }

  async deleteUser(cpf_cnpj: string): Promise<UserResponseDto> {
    let deletedUser;

    try {
      deletedUser = await this.userRepository.deleteUser(cpf_cnpj);
    } catch (e) {
      console.log(e);
    }

    const builder = new UserResponseDtoBuilder();
    const userResponse = builder
      .setName(deletedUser.name)
      .setCpfCnpj(deletedUser.cpf_cnpj)
      .setEmail(deletedUser.email)
      .setSite(deletedUser.site)
      .build();

    return userResponse;
  }

  async getUserByCpfCnpj(cpf_cnpj: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByCpfCnpj(cpf_cnpj);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }
}

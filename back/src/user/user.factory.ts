import { CreateUserDto } from './dto/create-user.dto';

export class UserFactory {
  static createUser(data: CreateUserDto) {
    return {
      cpf_cnpj: data.cpf_cnpj,
      password: data.password,
      name: data.name,
      email: data.email,
      site: data.site,
      telephone: data.telephone.map((telephone) => ({
        number: telephone.number,
        userId: telephone.userId,
      })),
    };
  }
}

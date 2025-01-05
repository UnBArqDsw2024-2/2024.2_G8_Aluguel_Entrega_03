import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordAuthStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null; // Usuário não encontrado
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid ? user : null; // Retorna o usuário se a senha for válida
  }
}

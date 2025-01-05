import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PasswordAuthStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(email: string, password: string): Promise<void> {
    // Buscar o usuário pelo e-mail
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Validar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }
  }
}

// src/auth/strategies/PasswordAuthStrategy.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PasswordAuthStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(email: string, password: string): Promise<any> {
    // Aqui você deve buscar o usuário, não apenas verificar se as credenciais são válidas
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== password) {
      return null; // Ou retorne false
    }
    return user; // Retorna o usuário
  }
}


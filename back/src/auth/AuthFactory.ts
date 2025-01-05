import { Injectable } from '@nestjs/common';
import { PasswordAuth } from './PasswordAuth';
import { PasswordAuthStrategy } from './strategies/PasswordAuthStrategy';
import { TokenManager } from './TokenManager';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthFactory {
  static createAuthMethod(type: string, userRepository: UserRepository) {
    if (type === 'password') {
      const strategy = new PasswordAuthStrategy(userRepository);  // Passando o userRepository como parâmetro
      const tokenManager = new TokenManager();  // Criando o gerenciador de token
      return new PasswordAuth(strategy, tokenManager);  // Passando a estratégia e o token manager
    }

    throw new Error('Método de autenticação não suportado');
  }
}

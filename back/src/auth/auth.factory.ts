import { Injectable } from '@nestjs/common';
import { PasswordAuthStrategy } from './strategies/password.auth.strategy';
import { TokenManager } from './token.manager';
import { UserRepository } from 'src/user/user.repository';
import { PasswordAuth } from './password.auth';

@Injectable()
export class AuthFactory {
  static createAuthMethod(type: string, userRepository: UserRepository) {
    if (type === 'password') {
      const strategy = new PasswordAuthStrategy(userRepository);
      const tokenManager = new TokenManager();
      return new PasswordAuth(strategy, tokenManager);
    }

    throw new Error('Método de autenticação não suportado');
  }
}

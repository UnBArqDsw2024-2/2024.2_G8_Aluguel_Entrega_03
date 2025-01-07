import { Injectable } from '@nestjs/common';
import { PasswordAuthStrategy } from './strategies/password.auth.strategy';
import { TokenManager } from './token.manager';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PasswordAuth {
  constructor(
    private readonly strategy: PasswordAuthStrategy,
    private readonly tokenManager: TokenManager,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.strategy.authenticate(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.tokenManager.generateToken({ id: user.id, email: user.email });
  }
}

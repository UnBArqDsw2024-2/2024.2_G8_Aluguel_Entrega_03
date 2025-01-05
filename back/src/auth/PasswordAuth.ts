import { Injectable } from '@nestjs/common';
import { AuthTemplate } from './AuthTemplate';
import { PasswordAuthStrategy } from './strategies/PasswordAuthStrategy';
import { TokenManager } from './TokenManager';

@Injectable()
export class PasswordAuth extends AuthTemplate {
  constructor(
    private readonly strategy: PasswordAuthStrategy,  
    private readonly tokenManager: TokenManager,  
  ) {
    super();
  }

  protected validate(email: string, password: string): void {
    this.strategy.authenticate(email, password);
  }

  protected generateToken(email: string): string {
    return this.tokenManager.generateToken(email);
  }
}
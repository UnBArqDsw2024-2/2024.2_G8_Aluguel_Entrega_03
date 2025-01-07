import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PasswordAuth } from './password.auth';

@Injectable()
export class AuthService {
  constructor(
    private passwordAuth: PasswordAuth,
    private tokenManager: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.passwordAuth.login(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    const token = this.tokenManager.sign({
      id: user.id,
      email: user.email,
    });

    return { token };
  }
}

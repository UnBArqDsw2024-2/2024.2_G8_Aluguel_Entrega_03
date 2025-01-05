import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Importando o JwtService
import { LoginDto } from './dto/login.dto';
import { PasswordAuth } from './PasswordAuth';

@Injectable()
export class AuthService {
  constructor(
    private passwordAuth: PasswordAuth,
    private tokenManager: JwtService, // Injetando o JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.passwordAuth.login(loginDto.email, loginDto.password);

    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    // Gerando o token JWT usando o método correto 'sign'
    const token = this.tokenManager.sign({
      id: user.id,
      email: user.email,
    });

    return { token };
  }
}

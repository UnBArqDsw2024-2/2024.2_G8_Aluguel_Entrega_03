import { Injectable } from "@nestjs/common";
import { PasswordAuthStrategy } from "./strategies/PasswordAuthStrategy";
import { TokenManager } from "./tokenManager";
import { UnauthorizedException } from "@nestjs/common"; // Importando a exceção

@Injectable()
export class PasswordAuth {
  constructor(
    private readonly strategy: PasswordAuthStrategy,
    private readonly tokenManager: TokenManager,
  ) {}

  async login(email: string, password: string): Promise<any> {
    // Tenta autenticar o usuário
    const user = await this.strategy.authenticate(email, password);
    
    // Se o usuário não for encontrado ou a autenticação falhar, lança a exceção 401
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Lançando 401
    }
    
    // Se for válido, gera o token
    return this.tokenManager.generateToken({ id: user.id, email: user.email });
  }
}

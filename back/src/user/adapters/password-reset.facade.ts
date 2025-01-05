import { Injectable } from '@nestjs/common'; // se estiver usando NestJS
import { UserRepository } from '../user.repository';
import {
  TokenGeneratorFactory,
  TokenType,
} from '../factory/token-generator.factory';
import {
  PasswordHasherFactory,
  HasherType,
} from '../factory/password-hasher.factory';

/**
 * Facade que orquestra o fluxo de:
 * 1) Envio de link de reset
 * 2) Validação do token e redefinição da senha
 */
@Injectable()
export class PasswordResetFacade {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Envia o e-mail de reset para o usuário,
   * gerando e salvando o token no banco.
   */
  public async sendResetLink(email: string): Promise<void> {
    // 1) Verifica se usuário existe
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Em produção, muitas vezes retornamos 200 com msg genérica ("Se existir, enviaremos email...")
      throw new Error('Usuário não encontrado');
    }

    // 2) Cria instância do gerador de token (usando nossa Factory)
    const tokenGenerator = TokenGeneratorFactory.createTokenGenerator(
      TokenType.UUID,
    );
    // Se quiser JWT, troque para "TokenType.JWT"

    const token = tokenGenerator.generateToken();

    // 3) Define data de expiração (ex: 1h a partir de agora)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // 4) Salva o token e expiração no banco
    await this.userRepository.updateResetToken(user.cpf_cnpj, token, expiresAt);

    // 5) Simula o envio do e-mail com o token ou link
    const resetLink = `http://localhost:4200/reset-password?token=${token}`;
    console.log(`\n[SIMULAÇÃO] Enviar "e-mail" para ${user.email}:`);
    console.log(`Link de redefinição de senha: ${resetLink}\n`);
  }

  /**
   * Valida o token e redefine a senha do usuário.
   */
  public async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    // 1) Busca usuário pelo token
    const user = await this.userRepository.findByResetToken(token);
    if (!user) {
      throw new Error('Token inválido ou usuário não encontrado');
    }

    // 2) Verifica se o token expirou
    if (
      !user.reset_password_expires ||
      user.reset_password_expires < new Date()
    ) {
      throw new Error('Token expirado');
    }

    // 3) Reinstancia o gerador de token (Factory)
    const tokenGenerator = TokenGeneratorFactory.createTokenGenerator(
      TokenType.UUID,
    );
    const isValid = tokenGenerator.validateToken(token);
    if (!isValid) {
      throw new Error('Token inválido');
    }

    // 4) Atualiza a senha do usuário
    const hasher = PasswordHasherFactory.createHasher(HasherType.BCRYPT);
    const hashedPassword = await hasher.hash(newPassword);

    await this.userRepository.updatePassword(user.cpf_cnpj, hashedPassword);

    // 5) Invalida o token no banco (ou remove)
    await this.userRepository.updateResetToken(user.cpf_cnpj, null, null);
  }
}

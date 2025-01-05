import { ITokenGenerator } from './ITokenGenerator';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'CHAVE_SECRETA_AQUI';

export class JwtTokenGenerator implements ITokenGenerator {
  generateToken(): string {
    // Gera um JWT simples, definindo expiração de 1 hora, por exemplo
    return jwt.sign({ resetPassword: true }, SECRET_KEY, {
      expiresIn: '1h',
    });
  }

  validateToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      // Se não der erro, retorna true
      return !!decoded;
    } catch {
      // Se der erro, token é inválido
      return false;
    }
  }
}

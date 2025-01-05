import * as jwt from 'jsonwebtoken';

export class TokenManager {
  public static instance: TokenManager;

  public constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  generateToken(email: string): string {
    // A chave secreta deve ser segura e armazenada de forma protegida
    const secretKey = 'your-secret-key';
    return jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  }
}

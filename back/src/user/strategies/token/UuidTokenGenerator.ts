import { ITokenGenerator } from './ITokenGenerator';
import { v4 as uuidv4 } from 'uuid';

export class UuidTokenGenerator implements ITokenGenerator {
  generateToken(): string {
    // Gera um UUID (ex: "6f0b1d6a-6e91-4d84-b14b-8fef3e7eb17f")
    return uuidv4();
  }

  validateToken(token: string): boolean {
    // Valida formato de UUID usando regex simples
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(token);
  }
}

import { ITokenGenerator } from '../strategies/token/ITokenGenerator';
import { UuidTokenGenerator } from '../strategies/token/UuidTokenGenerator';
import { JwtTokenGenerator } from '../strategies/token/JwtTokenGenerator';

export enum TokenType {
  UUID = 'uuid',
  JWT = 'jwt',
}

export class TokenGeneratorFactory {
  public static createTokenGenerator(type: TokenType): ITokenGenerator {
    switch (type) {
      case TokenType.UUID:
        return new UuidTokenGenerator();
      case TokenType.JWT:
        return new JwtTokenGenerator();
      default:
        throw new Error(`Tipo de token desconhecido: ${type}`);
    }
  }
}

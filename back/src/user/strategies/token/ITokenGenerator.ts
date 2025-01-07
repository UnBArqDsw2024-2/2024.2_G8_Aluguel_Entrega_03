export interface ITokenGenerator {
  generateToken(): string;

  validateToken(token: string): boolean;
}

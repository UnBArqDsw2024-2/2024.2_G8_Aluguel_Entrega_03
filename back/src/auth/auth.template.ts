export abstract class AuthTemplate {
  login(email: string, password: string): string {
    this.validate(email, password);
    return this.generateToken(email);
  }

  protected abstract validate(email: string, password: string): void;
  protected abstract generateToken(email: string): string;
}

export interface IPasswordHasher {
  /**
   * Gera um hash a partir de uma senha em texto puro
   */
  hash(password: string): Promise<string>;

  /**
   * Compara uma senha em texto puro com o hash armazenado
   */
  compare(password: string, hashed: string): Promise<boolean>;
}

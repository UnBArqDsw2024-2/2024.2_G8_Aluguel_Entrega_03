import { IPasswordHasher } from './IPasswordHasher';
import * as argon2 from 'argon2';

export class Argon2PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = Buffer.from('somesalt');
    return argon2.hash(password, { salt });
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return argon2.verify(hashed, password);
  }
}

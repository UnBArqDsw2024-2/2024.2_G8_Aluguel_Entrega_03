// src/user/factories/password-hasher.factory.ts

import { IPasswordHasher } from '../strategies/password-hasher/IPasswordHasher';
import { BcryptPasswordHasher } from '../strategies/password-hasher/BcryptPasswordHasher';
import { Argon2PasswordHasher } from '../strategies/password-hasher/Argon2PasswordHasher';

export enum HasherType {
  BCRYPT = 'bcrypt',
  ARGON2 = 'argon2',
}

export class PasswordHasherFactory {
  public static createHasher(type: HasherType): IPasswordHasher {
    switch (type) {
      case HasherType.BCRYPT:
        return new BcryptPasswordHasher();
      case HasherType.ARGON2:
        return new Argon2PasswordHasher();
      default:
        throw new Error(`Tipo de Hasher desconhecido: ${type}`);
    }
  }
}

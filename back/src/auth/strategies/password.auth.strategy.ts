import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PasswordAuthStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid ? user : null;
  }
}

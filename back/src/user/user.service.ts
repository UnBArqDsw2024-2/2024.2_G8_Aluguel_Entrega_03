import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, name?: string): Promise<User> {
    return this.userRepository.createUser(email, name);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }
}

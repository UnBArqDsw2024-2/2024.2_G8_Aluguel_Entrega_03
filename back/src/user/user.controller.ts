import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('name') name?: string,
  ): Promise<User> {
    return this.userService.createUser(email, name);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}

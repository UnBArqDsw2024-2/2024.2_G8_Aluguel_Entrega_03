import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Delete()
  async deleteUser(@Body('cpf_cnpj') cpf_cnpj: string): Promise<string> {
    return this.userService.deleteUser(cpf_cnpj);
  }
}

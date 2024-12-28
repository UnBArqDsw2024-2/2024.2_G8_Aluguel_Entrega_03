import { Body, Controller, Param, Post, Put, Delete } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':cpf_cnpj')
  async update(
    @Param('cpf_cnpj') cpf: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(cpf, data);
  }

  @Delete()
  async deleteUser(@Body('cpfcnpj') cpfcnpj: number): Promise<User> {
    return this.userService.deleteUser(cpfcnpj);
  }
}

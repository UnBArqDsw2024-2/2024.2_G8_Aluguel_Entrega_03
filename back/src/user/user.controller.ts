import { Body, Controller, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { Get } from '@nestjs/common';

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
  async deleteUser(
    @Body('cpf_cnpj') cpf_cnpj: string,
  ): Promise<UserResponseDto> {
    return this.userService.deleteUser(cpf_cnpj);
  }

  @Get(':cpf_cnpj')
  async getUserInfo(@Param('cpf_cnpj') cpf: string): Promise<UserResponseDto> {
    return this.userService.getUserByCpfCnpj(cpf);
  }
}

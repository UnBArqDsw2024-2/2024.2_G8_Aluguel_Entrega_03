import { Body, Controller, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { PasswordResetFacade } from './adapters/password-reset.facade';
import { Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordResetFacade: PasswordResetFacade,
  ) {}

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

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }, @Res() res) {
    try {
      const link = await this.passwordResetFacade.sendResetLink(body.email);
      return res.status(HttpStatus.OK).json({
        message: link,
      });
    } catch (error: any) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: { token: string; newPassword: string },
    @Res() res,
  ) {
    try {
      await this.passwordResetFacade.resetPassword(
        body.token,
        body.newPassword,
      );
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Senha atualizada com sucesso!' });
    } catch (error: any) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
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

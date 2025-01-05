import { Controller, Post, Body, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'; // Ajuste conforme o caminho correto do serviço
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto); // Passe o objeto completo 'loginDto'
  }
}

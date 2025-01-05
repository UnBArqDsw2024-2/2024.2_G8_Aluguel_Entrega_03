// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PasswordAuth } from './PasswordAuth';
import { PasswordAuthStrategy } from './strategies/PasswordAuthStrategy';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenManager } from './tokenManager'; // Certifique-se de que está importado corretamente
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: 'SECRET_KEY', // Sua chave secreta
    signOptions: { expiresIn: '1h' }, // Tempo de expiração do token (1 hora, por exemplo)
  })],
  providers: [
    PasswordAuth,
    PasswordAuthStrategy,
    TokenManager, // Adicionado como provider
    UserRepository,
    PrismaService,
    AuthService,
  ],
  exports: [TokenManager], // Opcional, se for usado em outros módulos
})
export class AuthModule {}

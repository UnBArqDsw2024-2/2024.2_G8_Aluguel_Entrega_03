import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PasswordAuthStrategy } from './strategies/password.auth.strategy';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenManager } from './token.manager'; 
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PasswordAuth } from './password.auth';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: 'asdsadkjnaskdjaskdnasdkjn123', 
    signOptions: { expiresIn: '1h' }, 
  })],
  providers: [
    PasswordAuth,
    PasswordAuthStrategy,
    TokenManager, 
    UserRepository,
    PrismaService,
    AuthService,
  ],
  exports: [TokenManager], 
})
export class AuthModule {}

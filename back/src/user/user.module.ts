import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PasswordResetFacade } from './adapters/password-reset.facade';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, PasswordResetFacade],
  exports: [UserService],
})
export class UserModule {}

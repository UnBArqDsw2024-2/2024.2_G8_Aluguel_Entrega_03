import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BuscaModule } from './busca/busca.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, AuthModule, PropertyModule, BuscaModule],
})
export class AppModule {}

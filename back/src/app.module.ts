import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdsModule } from './property/property.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, AdsModule],
})
export class AppModule {}

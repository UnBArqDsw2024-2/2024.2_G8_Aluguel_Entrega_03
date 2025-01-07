import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';

@Module({
  providers: [PropertyService, PropertyRepository, PrismaService],
  controllers: [PropertyController],
  exports: [PropertyService],
})
export class PropertyModule {}

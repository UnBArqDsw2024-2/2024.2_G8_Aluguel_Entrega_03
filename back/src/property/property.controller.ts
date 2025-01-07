import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  PropertyResponseDto,
  PropertyUpdateStatusDto,
} from './dto/property-response.dto';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.propertyService.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreatePropertyDto): Promise<PropertyResponseDto> {
    return this.propertyService.create(dto);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<PropertyUpdateStatusDto> {
    return this.propertyService.updateStatus(Number(id), status);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreatePropertyDto) {
    return this.propertyService.updateProperty(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.propertyService.deleteProperty(id);
  }
}

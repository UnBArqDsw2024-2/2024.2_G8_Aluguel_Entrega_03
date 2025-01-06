import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyResponseDto } from './dto/property-response.dto';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePropertyDto): Promise<PropertyResponseDto> {
    return this.propertyService.create(dto);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<PropertyUpdateStatusDto> {
    return this.propertyService.updateStatus(Number(id), status);
  }
}

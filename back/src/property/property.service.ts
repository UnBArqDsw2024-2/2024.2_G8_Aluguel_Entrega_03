import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyResponseDtoBuilder } from './dto/property-response.dto';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly repository: PropertyRepository) {}

  async findAll() {
    return 'This action returns all ads';
  }

  async findOne(id: string) {
    return `This action returns a #${id} ad`;
  }

  async create(dto: CreatePropertyDto) {
    const property = await this.repository.createProperty(dto);

    const builder = new PropertyResponseDtoBuilder();
    const response = builder
      .withId(1)
      .withDescription(property.description)
      .withCpfCnpj(property.userCpfCnpj)
      .withCreatedAt(new Date())
      .build();

    return response;
  }
}

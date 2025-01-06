import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyResponseDtoBuilder, PropertyUpdateStatusDto } from './dto/property-response.dto';
import { PropertyRepository } from './property.repository';
import { UpdatePropertyCommand } from './commands/update-property.command';
import { PropertyPrototype } from './prototype/property.prototype';
import { PropertyLeaf } from './composites/property-leaf';
import { PropertyComposite } from './composites/property-composite';

@Injectable()
export class PropertyService {
  constructor(private readonly repository: PropertyRepository) { }

  async findAll() {
    return 'This action returns all ads';
  }

  async findOne(id: string) {
    return `This action returns a #${id} ad`;
  }

  async updateStatus(
    id: number,
    status: string,
  ): Promise<PropertyUpdateStatusDto> {
    const property = await this.repository.findPropertyById(id);

    if (!property) {
      throw new NotFoundException(`Propriedade com ID ${id} não encontrada.`);
    }

    await this.repository.updatePropertyStatus(id, status);

    return { id, status };
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

  async updateProperty(id: number, data: CreatePropertyDto) {
    const property = await this.repository.findPropertyById(id);
    if (!property) {
      throw new NotFoundException(`Propriedade com ID ${id} não encontrada.`);
    }
  
    const propertyPrototype = Object.assign(new PropertyPrototype(), property);
    const clonedProperty = propertyPrototype.clone();
  
    Object.assign(clonedProperty, data);
  
    return this.repository.updateProperty(id, clonedProperty);
  }

  async deleteProperty(id: number): Promise<{ message: string }> {
    const property = await this.repository.findPropertyById(id);
    if (!property) {
      throw new NotFoundException(`Propriedade com ID ${id} não encontrada.`);
    }
  
    const composite = new PropertyComposite();

    composite.add(new PropertyLeaf(id, this.repository));
  
    if (property.address) {
      composite.add(new PropertyLeaf(property.address.id, this.repository));
    }
  
    await composite.delete();
  
    return { message: `Propriedade com ID ${id} excluída com sucesso.` };
  }
}

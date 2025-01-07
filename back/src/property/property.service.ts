import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  PropertyResponseDtoBuilder,
  PropertyUpdateStatusDto,
} from './dto/property-response.dto';
import { PropertyRepository } from './property.repository';
import { FindOneProperty } from './find-properties/find-one';
import { PropertyPrototype } from './prototype/property.prototype';
import { PropertyLeaf } from './composites/property-leaf';
import { PropertyComposite } from './composites/property-composite';

@Injectable()
export class PropertyService {
  constructor(private readonly repository: PropertyRepository) {}

  async findAll() {
    return 'This action returns all ads';
  }

  async findOne(id: number) {
    const finder = new FindOneProperty(this.repository);
    return finder.getObject(id);
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
      .withId(property.id)
      .withDescription(property.description)
      .withCpfCnpj(property.userCpfCnpj)
      .withCreatedAt(new Date())
      .withStatus(property.status)
      .withAddressPk(property.addressPk)
      .withAdType(property.adType)
      .withCondoFee(property.condoFee)
      .withPropertyTax(property.propertyTax)
      .withAvailable(property.available)
      .withNumberOfBedrooms(property.numberOfBedrooms)
      .withPrice(property.price)
      .withCreationDate(property.creationDate)
      .withParkingSpaces(property.parkingSpaces)
      .withPropertyType(property.propertyType)
      .withNumberOfBathrooms(property.numberOfBathrooms)
      .withUserCpfCnpj(property.userCpfCnpj)
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

    if (property.addressPk) {
      composite.add(new PropertyLeaf(property.addressPk, this.repository));
    }

    await composite.delete();

    return { message: `Propriedade com ID ${id} excluída com sucesso.` };
  }
}

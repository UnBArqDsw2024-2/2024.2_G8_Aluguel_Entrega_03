import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  PropertyResponseDtoBuilder,
  PropertyUpdateStatusDto,
} from './dto/property-response.dto';
import { PropertyRepository } from './property.repository';
import { FindOneProperty } from './find-properties/find-one';

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
      throw new NotFoundException('Propriedade com ID ${id} não encontrada.');
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
      .withStatus(property.status)
      .withAddressPk(property.addressPk)
      .withUser(property.user)
      .withAddress(property.address)
      .withReviews(property.reviews)
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
      .withAddressPk(property.address.postalCode)
      .withUser(property.user)
      .withAddress(property.address)
      .build();

    return response;
  }
}

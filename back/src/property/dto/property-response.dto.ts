import { Address, Review, User } from '@prisma/client';

export class PropertyResponseDto {
  id: number;
  cpfCnpj: string;
  description: string;
  createdAt: Date;
}

export interface PropertyDetailsDto {
  adType?: string;
  condoFee?: number;
  description?: string;
  propertyTax?: number;
  available?: boolean;
  numberOfBedrooms?: number;
  price?: number;
  creationDate?: Date;
  parkingSpaces?: number;
  propertyType?: string;
  numberOfBathrooms?: number;
  status?: string;

  userCpfCnpj?: string;
  addressPk?: number;

  user?: User;
  address?: Address;
  reviews?: Review[];
}

export class PropertyResponseDtoBuilder {
  private response: PropertyResponseDto;

  constructor() {
    this.response = new PropertyResponseDto();
  }

  withId(id: number) {
    this.response.id = id;
    return this;
  }

  withCpfCnpj(cpfCnpj: string) {
    this.response.cpfCnpj = cpfCnpj;
    return this;
  }

  withDescription(description: string) {
    this.response.description = description;
    return this;
  }

  withCreatedAt(createdAt: Date) {
    this.response.createdAt = createdAt;
    return this;
  }

  build() {
    return this.response;
  }
}

export class PropertyUpdateStatusDto {
  id: number;
  status: string;
}

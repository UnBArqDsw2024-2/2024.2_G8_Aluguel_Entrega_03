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

  withAdType(adType: string) {
    this.response['adType'] = adType;
    return this;
  }

  withCondoFee(condoFee: number) {
    this.response['condoFee'] = condoFee;
    return this;
  }

  withPropertyTax(propertyTax: number) {
    this.response['propertyTax'] = propertyTax;
    return this;
  }

  withAvailable(available: boolean) {
    this.response['available'] = available;
    return this;
  }

  withNumberOfBedrooms(numberOfBedrooms: number) {
    this.response['numberOfBedrooms'] = numberOfBedrooms;
    return this;
  }

  withPrice(price: number) {
    this.response['price'] = price;
    return this;
  }

  withCreationDate(creationDate: Date) {
    this.response['creationDate'] = creationDate;
    return this;
  }

  withParkingSpaces(parkingSpaces: number) {
    this.response['parkingSpaces'] = parkingSpaces;
    return this;
  }

  withPropertyType(propertyType: string) {
    this.response['propertyType'] = propertyType;
    return this;
  }

  withNumberOfBathrooms(numberOfBathrooms: number) {
    this.response['numberOfBathrooms'] = numberOfBathrooms;
    return this;
  }

  withStatus(status: string) {
    this.response['status'] = status;
    return this;
  }

  withUserCpfCnpj(userCpfCnpj: string) {
    this.response['userCpfCnpj'] = userCpfCnpj;
    return this;
  }

  withAddressPk(addressPk: number) {
    this.response['addressPk'] = addressPk;
    return this;
  }

  withUser(user: User) {
    this.response['user'] = user;
    return this;
  }

  withAddress(address: Address) {
    this.response['address'] = address;
    return this;
  }

  withReviews(reviews: Review[]) {
    this.response['reviews'] = reviews;
    return this;
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

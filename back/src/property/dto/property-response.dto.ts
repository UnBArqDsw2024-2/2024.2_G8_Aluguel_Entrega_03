export class PropertyResponseDto {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
}

export class AdResponseDtoBuilder {
  private response: PropertyResponseDto;

  constructor() {
    this.response = new PropertyResponseDto();
  }

  withId(id: number) {
    this.response.id = id;
    return this;
  }

  withDescription(description: string) {
    this.response.description = description;
    return this;
  }

  withPrice(price: number) {
    this.response.price = price;
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

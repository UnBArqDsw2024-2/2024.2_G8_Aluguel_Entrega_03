export class PropertyResponseDto {
  id: number;
  cpfCnpj: string;
  description: string;
  createdAt: Date;
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

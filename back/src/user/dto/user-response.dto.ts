export class UserResponseDto {
  name: string;
  cpf_cnpj: string;
  email: string;
  site: string;
}

export class UserResponseDtoBuilder {
  private data: UserResponseDto;

  constructor() {
    this.data = new UserResponseDto();
  }

  setName(name: string): UserResponseDtoBuilder {
    this.data.name = name;
    return this;
  }

  setCpfCnpj(cpf_cnpj: string): UserResponseDtoBuilder {
    this.data.cpf_cnpj = cpf_cnpj;
    return this;
  }

  setEmail(email: string): UserResponseDtoBuilder {
    this.data.email = email;
    return this;
  }

  setSite(site: string): UserResponseDtoBuilder {
    this.data.site = site;
    return this;
  }

  build(): UserResponseDto {
    return this.data;
  }
}

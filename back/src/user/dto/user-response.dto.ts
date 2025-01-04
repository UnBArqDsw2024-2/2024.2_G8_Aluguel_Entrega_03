export class UserResponseDto {
  name: string;
  cpf_cnpj: string;
  email: string;
  site: string;
}

export class UserResponseDtoBuilder {
  private name: string;
  private cpf_cnpj: string;
  private email: string;
  private site: string;

  setName(name: string): UserResponseDtoBuilder {
    this.name = name;
    return this;
  }

  setCpfCnpj(cpf_cnpj: string): UserResponseDtoBuilder {
    this.cpf_cnpj = cpf_cnpj;
    return this;
  }

  setEmail(email: string): UserResponseDtoBuilder {
    this.email = email;
    return this;
  }

  setSite(site: string): UserResponseDtoBuilder {
    this.site = site;
    return this;
  }

  build(): UserResponseDto {
    const userResponseDto = new UserResponseDto();
    userResponseDto.name = this.name;
    userResponseDto.cpf_cnpj = this.cpf_cnpj;
    userResponseDto.email = this.email;
    userResponseDto.site = this.site;
    return userResponseDto;
  }
}

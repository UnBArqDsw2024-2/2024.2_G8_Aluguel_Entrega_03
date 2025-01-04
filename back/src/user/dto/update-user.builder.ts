import { UpdateUserDto, UpdateTelephoneDto } from './update-user.dto';

export class UpdateUserBuilder {
  private userData: UpdateUserDto = {};

  setName(name: string): this {
    this.userData.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.userData.email = email;
    return this;
  }

  setPassword(password: string): this {
    this.userData.password = password;
    return this;
  }

  setSite(site: string): this {
    this.userData.site = site;
    return this;
  }

  setTelephones(telephones: UpdateTelephoneDto[]): this {
    this.userData.telephone = telephones;
    return this;
  }

  build(): UpdateUserDto {
    return this.userData;
  }
}

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsNumber()
  addressPk?: number;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}

enum Status {
  PUBLISHED = 'PUBLISHED',
  OFFLINE = 'OFFLINE',
  PAUSED = 'PAUSED',
}

export class CreatePropertyDto {
  @IsOptional()
  @IsString()
  adType?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'O valor do condomínio não pode ser negativo' })
  condoFee?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  propertyTax?: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsNumber()
  numberOfBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'O preço não pode ser negativo' })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'O número de vagas não pode ser negativo' })
  parkingSpaces?: number;

  @IsOptional()
  @IsString()
  propertyType?: string; // Ex: "apartment", "house"

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'O número de banheiros não pode ser negativo' })
  numberOfBathrooms?: number;

  @IsNotEmpty()
  @IsString()
  userCpfCnpj?: string;

  @IsEnum(Status, { message: 'Status inválido' })
  status?: Status;

  // Relacionamento aninhado com Address
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}

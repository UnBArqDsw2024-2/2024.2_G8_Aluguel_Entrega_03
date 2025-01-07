import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdateTelephoneDto {
  @IsNotEmpty()
  @IsString()
  number: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  site?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateTelephoneDto)
  telephone?: UpdateTelephoneDto[];
}

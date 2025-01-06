// src/property/property.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProperty(data: CreatePropertyDto): Promise<Property> {
    const userExists = await this.prisma.user.findUnique({
      where: { cpf_cnpj: data.userCpfCnpj },
    });
    if (!userExists) {
      throw new NotFoundException(
        `Usuário com CPF/CNPJ '${data.userCpfCnpj}' não encontrado.`,
      );
    }

    // Cria o imóvel
    return this.prisma.property.create({
      data: {
        adType: data.adType,
        condoFee: data.condoFee,
        description: data.description,
        propertyTax: data.propertyTax,
        available: data.available,
        numberOfBedrooms: data.numberOfBedrooms,
        price: data.price,
        parkingSpaces: data.parkingSpaces,
        propertyType: data.propertyType,
        numberOfBathrooms: data.numberOfBathrooms,
        status: data.status || 'offline',
        // Relaciona automaticamente ao usuário
        user: {
          connect: { cpf_cnpj: data.userCpfCnpj },
        },
        // Cria endereço, se vier no DTO
        address: data.address
          ? {
              create: {
                neighborhood: data.address.neighborhood,
                number: data.address.number,
                street: data.address.street,
                city: data.address.city,
                state: data.address.state,
                postalCode: data.address.postalCode,
              },
            }
          : undefined,
      },
      include: {
        address: true, // para retornar o address junto
      },
    });
  }
  async findPropertyById(id: number): Promise<Property> {
    return this.prisma.property.findUnique({
      where: { id },
    });
  }

  async updatePropertyStatus(id: number, status: string): Promise<Property> {
    return this.prisma.property.update({
      where: { id },
      data: { status },
    });
  }
}
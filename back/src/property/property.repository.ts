import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProperty(data: CreatePropertyDto) {
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

        // Relaciona com o usuário
        user: {
          connect: { cpf_cnpj: data.userCpfCnpj },
        },

        // Opcional: criar Address ao mesmo tempo
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
        user: true,
        address: true,
      },
    });
  }
}

import { Property } from '@prisma/client';
import { PropertyDetailsDto } from '../dto/property-response.dto';
import { PropertyRepository } from '../property.repository';
import { FindProperty } from '../templates/property-find';

export class FindOneProperty extends FindProperty<number, PropertyDetailsDto> {
  constructor(private readonly repository: PropertyRepository) {
    super();
  }

  protected validateObject(id: number): void {
    if (!id || id < 1) {
      throw new Error('ID is required and must be valid.');
    }
  }

  protected async fetchObject(id: number): Promise<Property> {
    return this.repository.findPropertyById(id);
  }

  protected formatResponse(property: Property): PropertyDetailsDto {
    return {
      ...property,
    };
  }
}

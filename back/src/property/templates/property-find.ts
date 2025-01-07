import { Property } from '@prisma/client';

export abstract class FindProperty<I, O> {
  async getObject(data: I): Promise<O> {
    this.validateObject(data);

    const property = await this.fetchObject(data);

    return this.formatResponse(property);
  }

  protected abstract validateObject(data: I): void;

  protected abstract fetchObject(data: I): Promise<Property | Property[]>;

  protected abstract formatResponse(property: Property | Property[]): O;
}

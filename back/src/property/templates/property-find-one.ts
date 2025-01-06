export abstract class ObjectDetailTemplate<T> {
  async getObjectDetail(id: string): Promise<T> {
    this.validateId(id);

    const object = await this.fetchObject(id);

    return this.formatObject(object);
  }

  protected validateId(id: string): void {
    if (!id || id.trim() === '') {
      throw new Error('Id da propriedade não informado');
    }
  }

  protected abstract fetchObject(id: string): Promise<T>;

  protected logObject(object: T): void {
    console.log('Fetched object:', object);
  }

  protected formatObject(object: T): T {
    return object;
  }
}

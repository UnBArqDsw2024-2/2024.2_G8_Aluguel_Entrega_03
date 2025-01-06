import { PropertyComponent } from './property-component';
import { PropertyRepository } from '../property.repository';

export class PropertyLeaf extends PropertyComponent {
  constructor(private readonly id: number, private readonly repository: PropertyRepository) {
    super();
  }

  async delete(): Promise<void> {
    await this.repository.deleteById(this.id);
    console.log(`Propriedade ou item relacionado com ID ${this.id} foi excluído.`);
  }
}

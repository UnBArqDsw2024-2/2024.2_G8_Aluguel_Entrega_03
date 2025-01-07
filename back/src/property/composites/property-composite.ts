import { PropertyComponent } from './property-component';

export class PropertyComposite extends PropertyComponent {
  private children: PropertyComponent[] = [];

  add(component: PropertyComponent): void {
    this.children.push(component);
  }

  async delete(): Promise<void> {
    for (const child of this.children) {
      await child.delete();
    }
  }
}

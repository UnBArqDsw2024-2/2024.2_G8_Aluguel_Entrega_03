import { Injectable } from '@angular/core';
import { Apartment, House, Property } from '../../shared/models/property.model';


@Injectable({
  providedIn: 'root',
})
export class PropertyFactory {
  createProperty(
    type: 'Apartamento' | 'Casa',
    image: string,
    location: string,
    rooms: number,
    size: number,
    price: number
  ): Property {
    if (type === 'Apartamento') {
      return new Apartment(image, location, rooms, size, price);
    } else if (type === 'Casa') {
      return new House(image, location, rooms, size, price);
    }
    throw new Error('Tipo de propriedade não reconhecido');
  }
}

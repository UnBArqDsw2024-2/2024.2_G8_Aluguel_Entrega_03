import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Property } from '../../models/property.model';
import { PropertyFactory } from '../../../core/services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent {
  properties: Property[] = [];

  constructor(
    private propertyFactory: PropertyFactory,
    private router: Router
  ) {
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = [
      this.propertyFactory.createProperty(
        'Apartamento',
        'assets/images/imovel1.png',
        'Brasília',
        3,
        60,
        2000
      ),
      this.propertyFactory.createProperty(
        'Casa',
        'assets/images/imovel2.png',
        'São Paulo',
        4,
        100,
        3000
      ),
      this.propertyFactory.createProperty(
        'Apartamento',
        'assets/images/imovel3.png',
        'Rio de Janeiro',
        2,
        50,
        1500
      ),
      this.propertyFactory.createProperty(
        'Casa',
        'assets/images/imovel4.png',
        'Belo Horizonte',
        5,
        120,
        4000
      ),
      this.propertyFactory.createProperty(
        'Apartamento',
        'assets/images/imovel5.png',
        'Curitiba',
        1,
        40,
        1000
      ),
      this.propertyFactory.createProperty(
        'Casa',
        'assets/images/imovel6.png',
        'Fortaleza',
        3,
        90,
        2500
      ),
    ];
  }
}

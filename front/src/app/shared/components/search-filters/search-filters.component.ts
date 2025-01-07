import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseFilterDecorator, LocationFilterDecorator, PriceRangeFilterDecorator } from './search-filters.decorator';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  imports: [
        CommonModule,
        FormsModule
      ],
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {
  locations: string[] = ['Brasília', 'São Paulo', 'Rio de Janeiro'];
  propertyTypes: string[] = ['Apartamento', 'Casa', 'Sala Comercial'];
  selectedLocation = '';
  selectedPropertyType = '';
  priceRange = 50000;
  isForSale = false;

  applyFilters(): void {
    console.log('Iniciando filtro de busca...');

    const baseFilter = new BaseFilterDecorator(this);
    baseFilter.applyFilters();

    const locationFilter = new LocationFilterDecorator(this);
    locationFilter.applyFilters();

    const priceRangeFilter = new PriceRangeFilterDecorator(this);
    priceRangeFilter.applyFilters();
  }
}

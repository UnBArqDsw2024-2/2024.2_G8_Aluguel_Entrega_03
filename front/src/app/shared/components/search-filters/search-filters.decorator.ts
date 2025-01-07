import { SearchFiltersComponent } from './search-filters.component';

export abstract class FilterDecorator {
  abstract applyFilters(): void;
}

export class BaseFilterDecorator extends FilterDecorator {
  constructor(private component: SearchFiltersComponent) {
    super();
  }

  applyFilters(): void {
    console.log('Aplicando filtros base:', {
      location: this.component.selectedLocation,
      propertyType: this.component.selectedPropertyType,
      priceRange: this.component.priceRange,
      isForSale: this.component.isForSale,
    });
  }
}

export class LocationFilterDecorator extends FilterDecorator {
  constructor(private component: SearchFiltersComponent) {
    super();
  }

  applyFilters(): void {
    console.log('Filtrando por localização:', this.component.selectedLocation);
  }
}

export class PriceRangeFilterDecorator extends FilterDecorator {
  constructor(private component: SearchFiltersComponent) {
    super();
  }

  applyFilters(): void {
    console.log(`Filtrando imóveis com preço até R$ ${this.component.priceRange}`);
  }
}

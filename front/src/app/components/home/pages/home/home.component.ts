import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SharedComponents } from '../../../../shared/shared.components';
import { SearchFiltersComponent } from '../../../../shared/components/search-filters/search-filters.component';
import { PropertyListComponent } from '../../../../shared/components/property-list/property-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
      HeaderComponent,
      FooterComponent,
      CommonModule,
      SharedComponents,
      SearchFiltersComponent,
      PropertyListComponent,
    ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
}

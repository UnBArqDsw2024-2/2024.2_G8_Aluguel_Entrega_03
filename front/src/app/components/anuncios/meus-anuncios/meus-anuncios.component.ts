import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioItemComponent } from '../anuncio-item/anuncio-item.component';
import { SharedComponents } from '../../../shared/shared.components';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AnunciosFacadeService } from '../../../core/services/anuncios-facade.service';
import { ImovelInterface } from '../../home/interfaces/imovel.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AnuncioItemComponent,
    SharedComponents,
    HeaderComponent,
    FooterComponent,
  ],
})
export class MeusAnunciosComponent implements OnInit {
  anuncios$!: Observable<ImovelInterface[]>;

  constructor(
    private anunciosFacade: AnunciosFacadeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.anunciosFacade.carregarAnuncios();
    this.anuncios$ = this.anunciosFacade.anuncios$;
  }
}

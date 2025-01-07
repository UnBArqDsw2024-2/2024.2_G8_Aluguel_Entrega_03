import { Component, Input } from '@angular/core';
import { ImovelInterface } from '../../home/interfaces/imovel.interface';
import { AnunciosFacadeService } from '../../../core/services/anuncios-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anuncio-item',
  templateUrl: './anuncio-item.component.html',
  styleUrls: ['./anuncio-item.component.css'],
  standalone: true
})
export class AnuncioItemComponent {
  @Input() anuncio!: ImovelInterface;

  constructor(
    private anunciosFacade: AnunciosFacadeService,
    private router: Router
  ) {}

  onEditar() {
    this.router.navigate(['/editar-anuncio', this.anuncio.id]);
  }

  onPausar() {
    if (confirm('Tem certeza que deseja pausar este anúncio?')) {
      this.anunciosFacade.pausarAnuncio(this.anuncio);
    }
  }

  onExcluir() {
    if (confirm('Tem certeza que deseja excluir este anúncio?')) {
      this.anunciosFacade.excluirAnuncio(this.anuncio);
    }
  }
}

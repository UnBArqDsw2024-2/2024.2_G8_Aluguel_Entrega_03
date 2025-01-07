import { Injectable } from '@angular/core';
import { ExcluirStrategy } from './excluir-strategy.interface';
import { AnunciosService } from '../core/services/anuncios.service';
import { ImovelInterface, TipoImovelEnum } from '../components/home/interfaces/imovel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcluirCasaStrategy implements ExcluirStrategy {
  constructor(private anunciosService: AnunciosService) {}

  excluir(anuncio: ImovelInterface): Observable<boolean> {
    if (anuncio.tipoImovel !== TipoImovelEnum.CASA) {
      throw new Error('Estratégia incompatível com o tipo de imóvel');
    }
    return this.anunciosService.excluirAnuncio(anuncio.id!);
  }
}

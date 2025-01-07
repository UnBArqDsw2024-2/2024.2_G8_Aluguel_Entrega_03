import { Injectable } from '@angular/core';
import { PausarStrategy } from './pausar-strategy.interface';
import { AnunciosService } from '../core/services/anuncios.service';
import { ImovelInterface, TipoImovelEnum } from '../components/home/interfaces/imovel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PausarApartamentoStrategy implements PausarStrategy {
  constructor(private anunciosService: AnunciosService) {}

  pausar(anuncio: ImovelInterface): Observable<boolean> {
    if (anuncio.tipoImovel !== TipoImovelEnum.APARTAMENTO) {
      throw new Error('Estratégia incompatível com o tipo de imóvel');
    }
    return this.anunciosService.atualizarAnuncio(anuncio.id!, { ativo: false });
  }
}

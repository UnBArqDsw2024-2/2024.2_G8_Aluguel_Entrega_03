import { Injectable } from '@angular/core';
import { PausarStrategy } from '../../strategies/pausar-strategy.interface';
import { PausarCasaStrategy } from '../../strategies/pausar-casa.strategy';
import { PausarApartamentoStrategy } from '../../strategies/pausar-apartamento.strategy';
import { ImovelInterface, TipoImovelEnum } from '../../components/home/interfaces/imovel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PausarContextService {
  constructor(
    private pausarCasaStrategy: PausarCasaStrategy,
    private pausarApartamentoStrategy: PausarApartamentoStrategy
  ) {}

  pausarAnuncio(anuncio: ImovelInterface): Observable<boolean> {
    switch (anuncio.tipoImovel) {
      case TipoImovelEnum.CASA:
        return this.pausarCasaStrategy.pausar(anuncio);
      case TipoImovelEnum.APARTAMENTO:
        return this.pausarApartamentoStrategy.pausar(anuncio);
      default:
        throw new Error('Tipo de imóvel não suportado para pausar');
    }
  }
}

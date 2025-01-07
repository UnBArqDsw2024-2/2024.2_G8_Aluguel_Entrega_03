import { Injectable } from '@angular/core';
import { ExcluirStrategy } from '../../strategies/excluir-strategy.interface';
import { ExcluirCasaStrategy } from '../../strategies/excluir-casa.strategy';
import { ExcluirApartamentoStrategy } from '../../strategies/excluir-apartamento.strategy';
import { ImovelInterface, TipoImovelEnum } from '../../components/home/interfaces/imovel.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExcluirContextService {
    constructor(
        private excluirCasaStrategy: ExcluirCasaStrategy,
        private excluirApartamentoStrategy: ExcluirApartamentoStrategy
    ) { }

    excluirAnuncio(anuncio: ImovelInterface): Observable<boolean> {
        switch (anuncio.tipoImovel) {
            case TipoImovelEnum.CASA:
                return this.excluirCasaStrategy.excluir(anuncio);
            case TipoImovelEnum.APARTAMENTO:
                return this.excluirApartamentoStrategy.excluir(anuncio);
            default:
                throw new Error('Tipo de imóvel não suportado para excluir');
        }
    }
}

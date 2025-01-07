import { Injectable } from '@angular/core';
import { ImovelInterface } from '../../components/home/interfaces/imovel.interface';

@Injectable({
    providedIn: 'root'
})
export class AnuncioAdapterService {
    adaptar(dados: any): ImovelInterface {
        return {
            id: dados.id,
            titulo: dados.titulo,
            descricao: dados.descricao,
            endereco: dados.endereco,
            tipoAnuncio: dados.tipoAnuncio,
            tipoImovel: dados.tipoImovel,
            valorAluguel: dados.valorAluguel,
            valorCondominio: dados.valorCondominio,
            valorIptu: dados.valorIptu,
            quantidadeQuartos: dados.quantidadeQuartos,
            quantidadeBanheiros: dados.quantidadeBanheiros,
            metrosQuadrados: dados.metrosQuadrados,
            ativo: dados.ativo
        };
    }

    adaptarParaApi(imovel: ImovelInterface): any {
        return {
            id: imovel.id,
            titulo: imovel.titulo,
            descricao: imovel.descricao,
            endereco: imovel.endereco,
            tipoAnuncio: imovel.tipoAnuncio,
            tipoImovel: imovel.tipoImovel,
            valorAluguel: imovel.valorAluguel,
            valorCondominio: imovel.valorCondominio,
            valorIptu: imovel.valorIptu,
            quantidadeQuartos: imovel.quantidadeQuartos,
            quantidadeBanheiros: imovel.quantidadeBanheiros,
            metrosQuadrados: imovel.metrosQuadrados,
            ativo: imovel.ativo
        };
    }
}

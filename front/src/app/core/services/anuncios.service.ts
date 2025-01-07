import { Injectable } from '@angular/core';
import { ImovelInterface, TipoAnuncioEnum, TipoImovelEnum, EnderecoInterface } from '../../components/home/interfaces/imovel.interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root' // Singleton
})
export class AnunciosService {
    private anuncios: ImovelInterface[] = [
        {
            id: 1,
            titulo: 'Apartamento Moderno no Centro',
            descricao: 'Apartamento com 3 quartos, 2 banheiros e varanda.',
            endereco: {
                cep: '01000-000',
                rua: 'Rua Exemplo',
                bairro: 'Centro',
                numero: '123',
                cidade: 'São Paulo',
                estado: 'SP',
                logradouro: 'Avenida Paulista'
            },
            tipoAnuncio: TipoAnuncioEnum.ALUGUEL,
            tipoImovel: TipoImovelEnum.APARTAMENTO,
            valorAluguel: 3500,
            quantidadeQuartos: 3,
            quantidadeBanheiros: 2,
            metrosQuadrados: 120,
            ativo: true
        },
        {
            id: 2,
            titulo: 'Casa Espaçosa com Jardim',
            descricao: 'Casa com 4 quartos, 3 banheiros e grande jardim.',
            endereco: {
                cep: '02000-000',
                rua: 'Rua Jardim',
                bairro: 'Jardim Paulista',
                numero: '456',
                cidade: 'São Paulo',
                estado: 'SP',
                logradouro: 'Avenida Brasil'
            },
            tipoAnuncio: TipoAnuncioEnum.VENDA,
            tipoImovel: TipoImovelEnum.CASA,
            valorAluguel: undefined,
            valorCondominio: undefined,
            quantidadeQuartos: 4,
            quantidadeBanheiros: 3,
            metrosQuadrados: 200,
            ativo: true
        }
        // Adicione mais anúncios conforme necessário
    ];

    listarAnuncios(): Observable<ImovelInterface[]> {
        return of(this.anuncios);
    }

    obterAnuncioPorId(id: string | number): Observable<ImovelInterface | undefined> {
        const anuncio = this.anuncios.find(a => a.id === id);
        return of(anuncio);
    }

    atualizarAnuncio(id: string | number, dados: Partial<ImovelInterface>): Observable<boolean> {
        const index = this.anuncios.findIndex(a => a.id === id);
        if (index !== -1) {
            this.anuncios[index] = { ...this.anuncios[index], ...dados };
            return of(true);
        }
        return of(false);
    }

    excluirAnuncio(id: string | number): Observable<boolean> {
        const index = this.anuncios.findIndex(a => a.id === id);
        if (index !== -1) {
            this.anuncios.splice(index, 1);
            return of(true);
        }
        return of(false);
    }
}

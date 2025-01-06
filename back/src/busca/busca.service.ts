import { Injectable } from '@nestjs/common';
import { FiltroFactory } from './busca.factory';
import { ManipuladorDeFiltros } from './filtros/manipulador.filtros';

@Injectable()
export class BuscaService {
  constructor(private readonly filtroFactory: FiltroFactory) {}

  async buscar(filtros: any) {
    const cadeiaDeFiltros = this.filtroFactory.criarCadeiaDeFiltros(filtros);
    const resultados = await cadeiaDeFiltros.processar(filtros);
    return resultados;
  }
}
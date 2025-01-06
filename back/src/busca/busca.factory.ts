import { Injectable } from '@nestjs/common';
import { ManipuladorDeFiltros } from './filtros/manipulador.filtros';
import { FiltroPreco } from './filtros/filtro.preco';
import { FiltroCategoria } from './filtros/filtro.categoria';
import { FiltroLocalidade } from './filtros/filtro.localidade';

@Injectable()
export class FiltroFactory {
  criarCadeiaDeFiltros(filtros: any): ManipuladorDeFiltros {
    const filtroPreco = new FiltroPreco();
    const filtroCategoria = new FiltroCategoria();
    const filtroLocalidade = new FiltroLocalidade();

    // Constrói a cadeia de responsabilidade
    filtroPreco.setProximo(filtroCategoria);
    filtroCategoria.setProximo(filtroLocalidade);

    return filtroPreco;
  }
}
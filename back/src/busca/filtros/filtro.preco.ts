import { ManipuladorDeFiltros } from './manipulador.filtros';

export class FiltroPreco extends ManipuladorDeFiltros {
  protected async aplicarFiltro(filtros: any): Promise<any> {
    if (filtros.preco) {
      console.log(`Filtrando por preço: ${filtros.preco}`);
    }
    return filtros;
  }
}
import { ManipuladorDeFiltros } from './manipulador.filtros';

export class FiltroCategoria extends ManipuladorDeFiltros {
  protected async aplicarFiltro(filtros: any): Promise<any> {
    if (filtros.categoria) {
      // Lógica para filtrar por categoria
      console.log(`Filtrando por categoria: ${filtros.categoria}`);
    }
    return filtros;
  }
}
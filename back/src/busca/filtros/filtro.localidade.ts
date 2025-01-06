import { ManipuladorDeFiltros } from './manipulador.filtros';

export class FiltroLocalidade extends ManipuladorDeFiltros {
  protected async aplicarFiltro(filtros: any): Promise<any> {
    if (filtros.localidade) {
      // Lógica para filtrar por localidade
      console.log(`Filtrando por localidade: ${filtros.localidade}`);
    }
    return filtros;
  }
}
export abstract class ManipuladorDeFiltros {
    private proximo: ManipuladorDeFiltros | null = null;
  
    setProximo(proximo: ManipuladorDeFiltros): void {
      this.proximo = proximo;
    }
  
    async processar(filtros: any): Promise<any> {
      const resultado = await this.aplicarFiltro(filtros);
  
      if (this.proximo) {
        return this.proximo.processar(resultado);
      }
  
      return resultado;
    }
  
    protected abstract aplicarFiltro(filtros: any): Promise<any>;
  }
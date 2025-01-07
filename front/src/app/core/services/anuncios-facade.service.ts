import { Injectable } from '@angular/core';
import { AnunciosService } from './anuncios.service';
import { ImovelInterface } from '../../components/home/interfaces/imovel.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnuncioAdapterService } from './anuncio-adapter.service';
import { PausarContextService } from './pausar-context.service';
import { ExcluirContextService } from './excluir-context.service';

@Injectable({
  providedIn: 'root'
})
export class AnunciosFacadeService {
  private anunciosSubject = new BehaviorSubject<ImovelInterface[]>([]);
  anuncios$ = this.anunciosSubject.asObservable();

  constructor(
    private anunciosService: AnunciosService,
    private adapter: AnuncioAdapterService,
    private pausarContext: PausarContextService,
    private excluirContext: ExcluirContextService
  ) {}

  carregarAnuncios() {
    this.anunciosService.listarAnuncios().subscribe({
      next: (dados) => {
        const imoveis = dados.map(dado => this.adapter.adaptar(dado));
        this.anunciosSubject.next(imoveis);
      },
      error: (err) => console.error('Erro ao carregar anúncios', err)
    });
  }

  obterAnuncioPorId(id: number): Observable<ImovelInterface | undefined> {
    return this.anunciosService.obterAnuncioPorId(id);
  }

  atualizarAnuncio(id: number, dados: Partial<ImovelInterface>) {
    this.anunciosService.atualizarAnuncio(id, dados).subscribe({
      next: () => this.carregarAnuncios(),
      error: (err) => console.error('Erro ao atualizar anúncio', err)
    });
  }

  pausarAnuncio(anuncio: ImovelInterface) {
    this.pausarContext.pausarAnuncio(anuncio).subscribe({
      next: () => this.carregarAnuncios(),
      error: (err) => console.error('Erro ao pausar anúncio', err)
    });
  }

  excluirAnuncio(anuncio: ImovelInterface) {
    this.excluirContext.excluirAnuncio(anuncio).subscribe({
      next: () => this.carregarAnuncios(),
      error: (err) => console.error('Erro ao excluir anúncio', err)
    });
  }
}

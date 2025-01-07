import { ImovelInterface } from '../components/home/interfaces/imovel.interface';
import { Observable } from 'rxjs';

export interface PausarStrategy {
  pausar(anuncio: ImovelInterface): Observable<boolean>;
}

import { ImovelInterface } from '../components/home/interfaces/imovel.interface';
import { Observable } from 'rxjs';

export interface ExcluirStrategy {
  excluir(anuncio: ImovelInterface): Observable<boolean>;
}
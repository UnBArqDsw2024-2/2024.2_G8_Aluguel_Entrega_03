import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuarioEstaLogado = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  setUsuarioLogado(isLogged: boolean) {
    this.usuarioEstaLogado.next(isLogged);
  }

  usuarioLogado() {
    return this.usuarioEstaLogado.asObservable();
  }

  getUser(): Observable<any> {
    return this.apiService.get(`/rota`);
  }
}

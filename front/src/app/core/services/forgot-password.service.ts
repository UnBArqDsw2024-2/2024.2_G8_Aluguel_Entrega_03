import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  RequestPasswordResetDto,
} from '../../interfaces/forgot-password.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private readonly API_URL = 'http://localhost:3000/user'; // Endpoint do backend

  constructor(private readonly http: HttpClient) {}

  /**
   * Request a password reset by sending a verification link to email
   * @param email User's email address
   * @returns Observable<ApiResponse>
   */
  requestPasswordReset(email: string): Observable<ApiResponse> {
    const dto: RequestPasswordResetDto = { email };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/forgot-password`, dto)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro ao processar a requisição.';

    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      errorMessage = error.error.message;
    } else {
      // Erro no servidor
      errorMessage =
        error.error.message ||
        `Erro: ${error.status} - ${error.statusText || 'Desconhecido'}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}

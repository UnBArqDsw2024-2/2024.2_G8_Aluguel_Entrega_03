import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface RequestPasswordResetDto {
  email: string;
}

export interface VerifyCodeDto {
  email: string;
  code: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ApiResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private readonly API_URL = 'http://localhost:3000'; // Endpoint do backend

  constructor(private readonly http: HttpClient) {}

  /**
   * Request a password reset by sending a verification link to email
   * @param email User's email address
   * @returns Observable<ApiResponse>
   */
  requestPasswordReset(email: string): Observable<ApiResponse> {
    const dto: RequestPasswordResetDto = { email };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/user/forgot-password`, dto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Reset the password using the provided reset link and new password
   * @param token The reset link received via email
   * @param newPassword The new password to set
   * @returns Observable<ApiResponse>
   */
  resetPassword(token: string, newPassword: string): Observable<ApiResponse> {
    const dto = { token, newPassword };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/user/reset-password`, dto)
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

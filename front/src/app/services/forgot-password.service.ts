import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  RequestPasswordResetDto,
  VerifyCodeDto,
  ResetPasswordDto,
  ApiResponse,
} from '../interfaces/forgot-password.interface';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private readonly API_URL = 'api/auth'; // Base API URL

  constructor(private readonly http: HttpClient) {}

  /**
   * Request a password reset by sending a verification code to email
   * @param email User's email address
   * @returns Observable<ApiResponse>
   */
  requestPasswordReset(email: string): Observable<ApiResponse> {
    const dto: RequestPasswordResetDto = { email };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/forgot-password`, dto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Verify the code sent to user's email
   * @param email User's email address
   * @param code Verification code
   * @returns Observable<ApiResponse> with reset token
   */
  verifyCode(email: string, code: string): Observable<ApiResponse<string>> {
    const dto: VerifyCodeDto = { email, code };

    return this.http
      .post<ApiResponse<string>>(`${this.API_URL}/verify-code`, dto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Reset the password using the verification token
   * @param token Reset password token
   * @param newPassword New password
   * @returns Observable<ApiResponse>
   */
  resetPassword(token: string, newPassword: string): Observable<ApiResponse> {
    const dto: ResetPasswordDto = { token, newPassword };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/reset-password`, dto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Resend verification code to email
   * @param email User's email address
   * @returns Observable<ApiResponse>
   */
  resendVerificationCode(email: string): Observable<ApiResponse> {
    const dto: RequestPasswordResetDto = { email };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/resend-code`, dto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Validate reset password token
   * @param token Reset password token
   * @returns Observable<boolean>
   */
  validateResetToken(token: string): Observable<boolean> {
    return this.http
      .get<ApiResponse>(`${this.API_URL}/validate-token/${token}`)
      .pipe(
        map((response) => response.success),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param error HttpErrorResponse
   * @returns Observable with error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error.message || 'Invalid request';
          break;
        case 404:
          errorMessage = 'User not found';
          break;
        case 429:
          errorMessage = 'Too many attempts. Please try again later';
          break;
        case 401:
          errorMessage = 'Invalid or expired code';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later';
          break;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}

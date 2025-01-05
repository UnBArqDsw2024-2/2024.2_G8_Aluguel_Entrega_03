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

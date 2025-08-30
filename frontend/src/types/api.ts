export interface HomeApiResponse {
  message: string;
  status: string;
  data: {
    title: string;
    description: string;
    version: string;
  };
}

// 認証関連の型定義
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
  };
}

export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  errors?: string[];
}

export interface MeResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    user: User;
  };
}
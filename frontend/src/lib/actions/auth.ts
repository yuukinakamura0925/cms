/**
 * 認証関連のAPI関数
 */

import { publicFetch, apiFetch } from '../api-client';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  MeResponse,
} from '@/types';

/**
 * ログイン
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  return publicFetch<AuthResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * ユーザー登録
 */
export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  return publicFetch<AuthResponse>('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * ログアウト
 */
export async function logout(): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/api/v1/auth/logout', {
    method: 'POST',
  });
}

/**
 * 現在のユーザー情報を取得
 */
export async function getMe(): Promise<MeResponse> {
  return apiFetch<MeResponse>('/api/v1/auth/me');
}

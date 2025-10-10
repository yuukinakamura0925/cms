/**
 * プロフィール関連のAPI関数
 */

import { apiFetch } from '../api-client';
import type { UserProfile, UserProfileRequest } from '@/types';

/**
 * プロフィール取得
 */
export async function getUserProfile(): Promise<UserProfile> {
  return apiFetch<UserProfile>('/api/v1/user_profile');
}

/**
 * プロフィール作成
 */
export async function createUserProfile(
  profileData: UserProfileRequest
): Promise<UserProfile> {
  return apiFetch<UserProfile>('/api/v1/user_profile', {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
}

/**
 * プロフィール更新
 */
export async function updateUserProfile(
  profileData: UserProfileRequest
): Promise<UserProfile> {
  return apiFetch<UserProfile>('/api/v1/user_profile', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  });
}

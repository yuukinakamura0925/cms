/**
 * ホーム関連のAPI関数
 */

import { publicFetch } from '../api-client';
import type { HomeResponse } from '@/types';

/**
 * ホームデータ取得
 */
export async function fetchHomeData(): Promise<HomeResponse> {
  return publicFetch<HomeResponse>('/api/v1/home');
}

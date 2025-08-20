import { HomeApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchHomeData(): Promise<HomeApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/home`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}
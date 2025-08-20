'use client';

import { useState, useEffect } from 'react';
import { fetchHomeData } from '@/lib/api';
import { HomeApiResponse } from '@/types/api';

export default function Home() {
  const [data, setData] = useState<HomeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const homeData = await fetchHomeData();
        setData(homeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {data?.data?.title}
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {data?.message}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {data?.data?.description}
            </p>
            
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-800 dark:text-green-200 font-medium">
                  API Status: {data?.status}
                </span>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Version: {data?.data?.version}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

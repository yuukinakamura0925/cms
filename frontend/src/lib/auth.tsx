'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { getMe } from './actions';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const checkAuth = async () => {
    console.log('認証チェック開始');
    try {
      const token = localStorage.getItem('access_token');
      console.log('トークン:', token ? 'あり' : 'なし');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await getMe();
      console.log('認証レスポンス:', response);
      if (response.status === 'success' && response.data?.user) {
        console.log('ユーザー情報設定:', response.data.user);
        setUser(response.data.user);
      } else {
        console.log('認証失敗、ログアウト実行');
        logout();
      }
    } catch (error) {
      console.error('認証チェックエラー:', error);
      logout();
    } finally {
      console.log('認証チェック完了、loading=false');
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
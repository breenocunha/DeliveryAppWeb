import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

export function useAuth() {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const response = await api.post('/users/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setData({} as AuthState);
  }, []);

  return { user: data.user, signIn, signOut };
} 
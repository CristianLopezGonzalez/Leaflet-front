/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
  const init = () => {
    try {
      const savedAccessToken = localStorage.getItem('accessToken');
      const savedRefreshToken = localStorage.getItem('refreshToken');
      const savedUser = localStorage.getItem('user');

      if (savedAccessToken && savedUser) {
        setAccessToken(savedAccessToken);
        setRefreshToken(savedRefreshToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Error al cargar sesión:', err);
      localStorage.clear();
    }
  };

  init();
}, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: userData, accessToken: token, refreshToken: refToken } = response.data;

      setUser(userData);
      setAccessToken(token);
      setRefreshToken(refToken);

      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', { username, email, password });
      const { user: userData, accessToken: token, refreshToken: refToken } = response.data;

      setUser(userData);
      setAccessToken(token);
      setRefreshToken(refToken);

      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error al registrarse';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (err: unknown) {
      console.error('Error al hacer logout:', err);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
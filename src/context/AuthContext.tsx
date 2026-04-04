import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, logout as apiLogout } from '@/utils/api';

interface AuthContextType {
  isAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status on mount
    setIsAuth(isAuthenticated());
  }, []);

  const login = (token: string) => {
    setIsAuth(true);
  };

  const logout = () => {
    apiLogout();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

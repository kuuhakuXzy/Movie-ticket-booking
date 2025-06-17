// src/lib/auth-context.ts
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (token && name && email) {
      setIsAuthenticated(true);
      setUser({ name, email });
    }
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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

import { createContext, ReactNode, useState, useCallback, useEffect } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "auth_data";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth) {
      const { user } = JSON.parse(storedAuth);
      return user;
    }
    return null;
  });

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  // Verify auth state on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth) {
      const { user } = JSON.parse(storedAuth);
      setUser(user);
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

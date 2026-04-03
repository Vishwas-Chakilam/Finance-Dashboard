import React, { createContext, useContext, useMemo, useState } from "react";

type MockUser = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: MockUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "finance_mock_auth_user";

const AuthContext = createContext<AuthContextType | null>(null);

const loadUser = (): MockUser | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(() => loadUser());

  const login = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    const nextUser = { name: "Demo User", email };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

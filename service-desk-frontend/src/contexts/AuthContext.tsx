import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { availablePages, Page } from "../config/pagesConfig";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  nome: string;
  cargo: string;
  ids: number[];
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  permissions: number[];
  pages: Page[];
  login: (token: string) => void;
  logout: () => void;
  verifyToken: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<number[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateUserPages = (permissions: number[]) => {
    const filteredPages = availablePages.filter((page) =>
      permissions.includes(page.id_page)
    );
    setPages(filteredPages);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setToken(null);
    setPermissions([]);
    setPages([]);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("authToken");

        if (storedToken) {
          const decoded: DecodedToken = jwtDecode(storedToken);

          if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            setToken(storedToken);
            setPermissions(decoded.ids);
            updateUserPages(decoded.ids);
          } else {
            throw new Error("Token expirado.");
          }
        } else {
          throw new Error("Token não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao carregar autenticação:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [logout]);

  const verifyToken = () => !!token && permissions.length > 0;

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        permissions,
        pages,
        login: (token) => {
          localStorage.setItem("authToken", token);

          const decoded: DecodedToken = jwtDecode(token);
          setIsAuthenticated(true);
          setToken(token);
          setPermissions(decoded.ids);
          updateUserPages(decoded.ids);

          navigate("/home");
        },
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

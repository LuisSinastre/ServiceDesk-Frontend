// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { availablePages, Page } from "../config/pagesConfig";

// Tipo de dados do contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  permissions: number[];
  pages: Page[];
  login: (token: string, permissions: number[]) => void;
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

  // Atualiza as páginas acessíveis com base nas permissões do usuário
  const updateUserPages = (permissions: number[]) => {
    const filteredPages = availablePages.filter((page) =>
      permissions.includes(page.id_page)
    );
    setPages(filteredPages);
  };

  // Função logout com useCallback para estabilizar a função entre as renderizações
  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authPermissions");
    setIsAuthenticated(false);
    setToken(null);
    setPermissions([]);
    setPages([]);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const permissionsString = localStorage.getItem("authPermissions");
        const permissions = permissionsString ? JSON.parse(permissionsString) : [];

        if (token && permissions.length > 0) {
          setIsAuthenticated(true);
          setToken(token);
          setPermissions(permissions);
          updateUserPages(permissions);
        } else {
          throw new Error("Token inválido ou permissões inválidas.");
        }
      } catch (error) {
        console.error("Erro ao carregar autenticação:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [navigate, logout]); // Incluindo `logout` como dependência estável

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
        login: (token, permissions) => {
          localStorage.setItem("authToken", token);
          localStorage.setItem("authPermissions", JSON.stringify(permissions));

          setIsAuthenticated(true);
          setToken(token);
          setPermissions(permissions);
          updateUserPages(permissions);

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

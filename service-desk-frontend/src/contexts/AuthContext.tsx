// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { availablePages, Page } from "../config/pagesConfig";

// Tipo de dados do contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  permissions: number[]; // Alterar para um array de números
  pages: Page[];
  login: (token: string, permissions: number[]) => void; // Alterar a assinatura da função login
  logout: () => void;
  verifyToken: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<number[]>([]); // Alterar para números
  const [pages, setPages] = useState<Page[]>([]);
  const navigate = useNavigate();

  // Atualiza as páginas acessíveis com base nas permissões do usuário
  const updateUserPages = (permissions: number[]) => {
    const filteredPages = availablePages.filter((page: Page) =>
      permissions.includes(page.id_page) // Verificando se o id_pagina está nas permissões
    );
    setPages(filteredPages);
  };

  // Verifica o token no localStorage ao montar o componente
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedPermissions = JSON.parse(localStorage.getItem("authPermissions") || "[]");

    const isValidPermissions =
      Array.isArray(storedPermissions) &&
      storedPermissions.every((p) => typeof p === "number"); // Verifica se as permissões são números

    if (storedToken && isValidPermissions) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setPermissions(storedPermissions);
      updateUserPages(storedPermissions); // Atualiza as páginas ao recuperar permissões
    } else {
      setIsAuthenticated(false);
      setToken(null);
      setPermissions([]);
      setPages([]);
      if (window.location.pathname !== "/") {
        navigate("/"); // Redireciona para a tela de login se não estiver na página inicial
      }
    }
  }, [navigate]);

  // Realiza login
  const login = (newToken: string, newPermissions: number[]) => { // Alterar para permissões como números
    // Armazenar o token e as permissões no localStorage
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authPermissions", JSON.stringify(newPermissions)); // Armazenar apenas os ids

    // Atualizar o estado
    setIsAuthenticated(true);
    setToken(newToken);
    setPermissions(newPermissions);  // Atualizar permissões como números
    updateUserPages(newPermissions);  // Atualiza as páginas acessíveis com base nos IDs
    navigate("/home");
  };

  // Realiza logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authPermissions");
    setIsAuthenticated(false);
    setToken(null);
    setPermissions([]);
    setPages([]);
    navigate("/login");
  };

  // Verifica se o token é válido
  const verifyToken = () => token !== null && permissions.length > 0;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, permissions, pages, login, logout, verifyToken }}
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

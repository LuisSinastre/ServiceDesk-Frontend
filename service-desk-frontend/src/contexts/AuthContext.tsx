import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Tipo de dados do contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  permissions: string[];
  login: (token: string, permissions: string[]) => void;
  logout: () => void;
  verifyToken: () => boolean;  // Função para verificar o token
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const navigate = useNavigate();

  // Verifica o token no localStorage quando o componente é montado
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedPermissions = JSON.parse(localStorage.getItem("authPermissions") || "[]");

    
    if (storedToken && storedPermissions.length > 0) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setPermissions(storedPermissions);  // Se houver token, o usuário está autenticado
    } else {
      setIsAuthenticated(false);  // Caso contrário, não autenticado
      setToken(null);
      setPermissions([]);
      navigate("/");  // Redireciona para a tela de login
    }
  }, [navigate]);






  const login = (newToken: string, newPermissions: string[]) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authPermissions", JSON.stringify(newPermissions)); // Armazena as permissões
    setIsAuthenticated(true);
    setToken(newToken);
    setPermissions(newPermissions);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authPermissions");
    setIsAuthenticated(false);
    setToken(null);
    setPermissions([]);
    navigate("/login");
  };

  const verifyToken = () => {
    return token !== null && permissions.length > 0;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, permissions, login, logout, verifyToken }}>
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

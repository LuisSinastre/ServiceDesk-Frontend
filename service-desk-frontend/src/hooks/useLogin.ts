import { useState } from "react";
import axiosInstance from "../api/axios"; // Importe a instância customizada do Axios
import { useAuth } from "../contexts/AuthContext"; // Importando o contexto de autenticação

// hooks/useLogin.ts
export const useLogin = () => {
  const { login } = useAuth(); // Acesso à função de login do AuthContext
  const [username, setUsername] = useState<string>(""); // Estado para o email
  const [password, setPassword] = useState<string>(""); // Estado para a senha
  const [error, setError] = useState<string | null>(null); // Estado para erro de login
  const [loading, setLoading] = useState<boolean>(false); // Estado de loading

  // Função para atualizar o estado de email
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Função para atualizar o estado de senha
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Função para tratar o login
  const loginUser = async () => {
    setLoading(true);
    setError(null); // Limpa o erro antes de tentar novamente
    try {
      // Chama a função login da instância axios
      const response = await axiosInstance.login(username, password);
      
      if (response?.token) {
        login(response.token); // Usando o login do contexto para armazenar o token
        console.log(response);
        return true; // Retorna true se o login for bem-sucedido
      }
      return false; // Retorna false se não for bem-sucedido
    } catch (err) {
      console.error("Erro no login", err);
      setError("Credenciais inválidas, tente novamente."); // Define a mensagem de erro
      return false; // Retorna false caso haja erro
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    loading,
    handleUsernameChange,
    handlePasswordChange,
    loginUser
  };
};
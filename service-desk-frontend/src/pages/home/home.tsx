import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate
import { useAuth } from "../../contexts/AuthContext"; // Importe o useAuth para acessar o contexto

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Acesse o estado de autenticação

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redireciona para a tela de login se não estiver autenticado
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Bem-vindo à Home</h1>
      {/* Conteúdo da home */}
    </div>
  );
};

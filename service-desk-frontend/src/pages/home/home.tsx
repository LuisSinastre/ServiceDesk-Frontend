// src/pages/home/home.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate
import { useAuth } from "../../contexts/AuthContext"; // Importe o useAuth para acessar o contexto

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, pages } = useAuth(); // Acesse o estado de autenticação

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redireciona para a tela de login se não estiver autenticado
    }
  }, [isAuthenticated, navigate]);

  const handlePageClick = (page: string) => {
    navigate(`/${page.toLowerCase()}`);
  }

  return (
    <div>
      <h1>Bem-vindo à Home</h1>
      {/* Conteúdo da home */}
      <br></br>
      <div>
        <h2>Páginas Acessíveis:</h2>
        <br></br>
        {pages.length > 0 ? (
          pages.map((page) => (
            <button
              key={page.id_page}
              onClick={() => handlePageClick(page.allowed_page)}
            >
              {page.allowed_page}
            </button>
          ))
        ) : (
          <p>Você não tem permissões para acessar nenhuma página.</p>
        )}
      </div>

    </div>
  );
};

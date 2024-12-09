import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { availablePages } from "../../config/pagesConfig";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Content,
  Title,
  PagesContainer,
  Button,
  NoAccessMessage,
} from "./styles";


interface DecodedToken {
  nome: string;
  }


const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, pages, token, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handlePageClick = (route: string) => {
    navigate(`/${route}`);
  };


  const getname = () => {
    try {
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.nome;
      }
    } catch (error) {
      console.error("Erro ao decodificar token", error);
    }
    return "";
  };

  return (
    <Container>
      <Content>
        <Title>Olá {getname()}, o que precisa fazer hoje?</Title>
        <PagesContainer>
          {pages.length > 0 ? (
            <div>
              {pages.map((page) => {
                // Buscar a configuração da página pelo id
                const pageConfig = availablePages.find(
                  (p) => p.id_page === page.id_page
                );
                return (
                  pageConfig && (
                    <Button
                      key={page.id_page}
                      onClick={() => handlePageClick(pageConfig.route)}
                    >
                      {pageConfig.allowed_page}
                    </Button>
                  )
                );
              })}
            </div>
          ) : (
            <NoAccessMessage>
              Você não tem permissões para acessar nenhuma página.
            </NoAccessMessage>
          )}
        </PagesContainer>
        <Button
          onClick={logout}
          style={{ marginTop: "20px", backgroundColor: "#f44336", color: "white" }}
        >
          LOGOUT
        </Button>
      </Content>
    </Container>
  );
};

export default Home;

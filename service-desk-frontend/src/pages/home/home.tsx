import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Container,
  Content,
  Title,
  PagesContainer,
  Button,
  NoAccessMessage,
} from "./styles";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, pages, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handlePageClick = (page: string) => {
    navigate(`/${page.toLowerCase()}`);
  };

  return (
    <Container>
      <Content>
        <Title>O que precisa fazer hoje?</Title>
        <PagesContainer>
          {pages.length > 0 ? (
            <div>
              {pages.map((page) => (
                <Button
                  key={page.id_page}
                  onClick={() => handlePageClick(page.allowed_page)}
                >
                  {page.allowed_page}
                </Button>
              ))}
            </div>
          ) : (
            <NoAccessMessage>
              Você não tem permissões para acessar nenhuma página.
            </NoAccessMessage>
          )}
        </PagesContainer>
        <Button onClick={logout} style={{ marginTop: "20px", backgroundColor: "#f44336", color: "white" }}>
          LOGOUT
        </Button>
      </Content>
    </Container>
  );
};

export default Home;

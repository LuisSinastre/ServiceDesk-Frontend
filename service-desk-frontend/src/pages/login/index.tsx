// src/pages/Login/index.tsx
import React, { useEffect } from "react";
import { Container, Content, InputGroup } from "./styles";
import { Button, InputText, Text } from "../../components";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Importe o contexto de autenticação

export const Login = () => {
  const {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handleSenhaChange,
    loginUser,
  } = useLogin();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Pegando o estado de autenticação do contexto

  useEffect(() => {
    // Se o usuário já estiver autenticado, redirecionar automaticamente para /home
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    const success = await loginUser();
    if (success) {
      navigate("/home");
    }
  };

  return (
    <Container>
      <Content>
        <Text fontSize="32px" isBold color="#007bff">Login</Text>
        <InputGroup>
          <Text color="#007bff">E-mail</Text>
          <InputText
            value={email}
            onChange={handleEmailChange}
            placeholder="Digite seu e-mail"
            name="email"
            type="email"
            disabled={false}
            required={true}
          />
        </InputGroup>

        <InputGroup>
          <Text color="#007bff">Senha</Text>
          <InputText
            value={password}
            onChange={handleSenhaChange}
            placeholder="Digite sua senha"
            name="senha"
            type="password"
            disabled={false}
            required={true}
          />
        </InputGroup>

        {error && <Text color="red">{error}</Text>}

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          <Text color="#FFFFFF">{loading ? "Carregando..." : "Entrar"}</Text>
        </Button>
      </Content>
    </Container>
  );
};

// pages/Login/index.tsx
import React from "react";
import { Container, Content, InputGroup } from "./styles";
import { Button, InputText, Text } from "../../components";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate

export const Login = () => {
  const {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handleSenhaChange,
    loginUser,
  } = useLogin(); // Use o hook para login

  const navigate = useNavigate(); // Crie a instância do navigate

  const handleSubmit = async () => {
    const success = await loginUser(); // Chama loginUser e verifica se o login foi bem-sucedido
    if (success) {
      navigate("/home"); // Redireciona para /home se o login for bem-sucedido
      
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

        {error && <Text color="red">{error}</Text>} {/* Exibe o erro, se houver */}

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          <Text color="#FFFFFF">{loading ? "Carregando..." : "Entrar"}</Text>
        </Button>
      </Content>
    </Container>
  );
};

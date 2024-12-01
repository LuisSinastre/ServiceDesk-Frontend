// styles.ts
import styled from "styled-components";

interface StyledButtonProps {
  color: string;
  fontSize: string;
  variant: "primary" | "secondary" | "tertiary"; // Tipos de variantes
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ variant }) => {
    if (variant === "primary") return "#007bff";
    if (variant === "secondary") return "#f0f0f0";
    return "transparent"; // Para o terciário
  }};
  color: ${({ variant }) => {
    if (variant === "primary") return "#fff";
    if (variant === "secondary") return "#232323";
    return "#007bff"; // Para o terciário, cor azul
  }};
  font-size: ${({ fontSize }) => fontSize};
  padding: 8px 16px;
  width: 100%;
  border: ${({ variant }) => (variant === "tertiary" ? "2px solid #007bff" : "none")}; // Tertiário tem borda
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ variant }) => {
      if (variant === "primary") return "#0056b3";
      if (variant === "secondary") return "#e0e0e0";
      return "#f0f0f0"; // Para o terciário, altera fundo no hover
    }};
    color: ${({ variant }) => {
      if (variant === "primary") return "#fff";
      if (variant === "secondary") return "#232323";
      return "#007bff"; // Para o terciário, altera cor no hover
    }};
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

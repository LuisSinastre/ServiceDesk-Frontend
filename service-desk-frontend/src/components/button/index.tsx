import React from "react";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;        // Cor do texto
  fontSize?: string;     // Tamanho da fonte
  variant?: "primary" | "secondary" | "tertiary"; // Tipos de variantes
  children: React.ReactNode;
}

export const Button = ({
  color = '#000000',
  fontSize = '14px',
  variant = "primary", // Definindo uma variante padrão
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      color={color}
      fontSize={fontSize}
      variant={variant} // Passando a variante para o StyledButton
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

import React from "react";
import { StyledText } from "./styles";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;      // Cor do texto
  fontSize?: string;   // Tamanho da fonte
  isBold?: boolean;    // Propriedade booleana para aplicar negrito
  children: React.ReactNode;
}

export const Text = ({
  color = '#000000',
  fontSize = '12px',
  isBold = false,
  children,
  ...rest
}: TextProps) => {
  return (
    <StyledText
      color={color}
      fontSize={fontSize}
      isBold={isBold}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

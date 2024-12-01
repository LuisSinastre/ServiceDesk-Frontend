import styled from "styled-components";

// Definindo as props que o input irá receber
interface TextProps {
  color?: string;      // Cor do texto
  fontSize?: string;   // Tamanho da fonte
  isBold?: boolean;    // Propriedade booleana para aplicar negrito
}

export const StyledText = styled.p<TextProps>`
  color: ${({ color }) => color || "#000000"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ isBold }) => (isBold ? "bold" : "normal")}
`;


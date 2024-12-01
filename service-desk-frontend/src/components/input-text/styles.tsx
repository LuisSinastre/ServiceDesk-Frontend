// StyledInputText em styled-components
import styled from "styled-components";

export const StyledInputText = styled.input`
  width: 100%;               /* Para o input ocupar toda a largura do seu contêiner */
  padding: 10px;             /* Espaçamento interno (dentro do campo) */
  font-size: 12px;           /* Tamanho da fonte */
  border: 1px solid #ccc;    /* Borda padrão */
  border-radius: 8px;        /* Bordas arredondadas */
  outline: none;             /* Remove o contorno padrão quando está em foco */
  
  /* Estilo do placeholder */
  &::placeholder {
    color: #888;             /* Cor do texto do placeholder */
    font-style: italic;      /* Itálico no texto do placeholder */
  }

  /* Estilos ao focar no campo */
  &:focus {
    border-color: #4d90fe;   /* Muda a cor da borda quando está em foco */
    box-shadow: 0 0 5px rgba(77, 144, 254, 0.5);  /* Adiciona um sombreado sutil */
  }

  /* Quando o campo estiver desabilitado */
  &:disabled {
    background-color: #f5f5f5;  /* Muda a cor de fundo para indicar que está desabilitado */
    cursor: not-allowed;        /* Muda o cursor para indicar que não pode interagir */
  }
`;

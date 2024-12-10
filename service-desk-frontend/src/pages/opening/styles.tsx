import styled from "styled-components";

// Container principal para a área de abertura de chamados
export const Container = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

// Conteúdo principal centralizado
export const Content = styled.div`
  max-width: 900px;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

// Lista de tipos de chamados
export const TipoLista = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  width: 100%;

  li {
    margin: 5px 0;
    cursor: pointer; /* Mãozinha nos itens da lista */
    color: #007bff;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;

// Card para cada tipo de chamado
export const TipoCard = styled.div`
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px;
  margin: 5px 0;
  text-align: center;
  transition: background-color 0.3s ease;

  cursor: pointer; /* Mãozinha no cartão interativo */
  &:hover {
    background-color: #d4d4d4;
  }
`;

// Outros componentes
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    color: #555;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #4caf50;
    }
  }
`;

export const Button = styled.button`
  padding: 12px 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export const Message = styled.div<{ success: boolean }>`
  margin-top: 20px;
  color: ${(props) => (props.success ? "green" : "red")};
  font-size: 1rem;
  font-weight: bold;
`;


export const HomeButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
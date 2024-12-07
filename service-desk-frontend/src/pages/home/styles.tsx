import styled from "styled-components";

// Container principal da home
export const Container = styled.div`
  background-color: #d3d3d3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

export const Content = styled.div`
  text-align: center;
  padding: 20px;
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 20px;
`;

export const PagesContainer = styled.div`
  text-align: left;
  margin-top: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }
`;

export const NoAccessMessage = styled.p`
  color: #999;
  font-style: italic;
  margin-top: 10px;
`;

// Button finalizado
export const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

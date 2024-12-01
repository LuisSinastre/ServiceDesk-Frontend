import styled from 'styled-components';

export const Container = styled.div`
  background-color: #D3D3D3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: #FFFFFF; 
  width: 400px;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #ccc;   
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 4px;
`;

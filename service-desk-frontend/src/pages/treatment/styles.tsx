// src/pages/approval/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const TicketList = styled.div`
  margin-top: 20px;
`;

export const TicketItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const TicketDetails = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const Message = styled.div<{ success: boolean }>`
  margin-top: 20px;
  padding: 15px;
  background-color: ${({ success }) => (success ? "#28a745" : "#dc3545")};
  color: white;
  border-radius: 5px;
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
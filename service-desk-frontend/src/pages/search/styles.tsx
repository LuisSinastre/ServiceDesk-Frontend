import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  height: 100vh;
  overflow-y: auto;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const HomeButton = styled.button`
  align-self: flex-start;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: none;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

export const TicketList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 600px;
  padding: 0;
  margin: 0;
`;

export const TicketItem = styled.li`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* Adicione esta linha */

  &:hover {
    border-color: #007bff;
  }

  .ticket-number {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }

  .ticket-type {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }

  .ticket-submotivo {
    font-size: 14px;
    color: #555;
  }
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-top: 20px;
`;


export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
`;

export const ModalHeader = styled.div`
  margin-bottom: 10px;
`;

export const ModalBody = styled.div`
  margin-bottom: 10px;

  form div {
    margin-bottom: 10px;
  }

  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const ModalFooter = styled.div`
  text-align: right;
`;

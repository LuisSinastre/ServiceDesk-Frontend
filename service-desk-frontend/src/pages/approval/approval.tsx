// src/pages/approval/approval.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container, TicketList, TicketItem, TicketDetails, Message } from "./styles";

const ApprovalPage: React.FC = () => {
  const { token } = useAuth();
  const [pendingTickets, setPendingTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  useEffect(() => {
    const fetchPendingTickets = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("/pending_approvals", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPendingTickets(response.data);
        } catch (error) {
          console.error("Erro ao buscar chamados pendentes:", error);
        }
      }
    };

    fetchPendingTickets();
  }, [token]);

  const handleApprove = async (ticketId: number) => {
    try {
      const response = await axiosInstance.post(
        `/approve_ticket/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado aprovado com sucesso!", success: true });
        setPendingTickets(pendingTickets.filter(ticket => ticket.id !== ticketId));
      }
    } catch (error) {
      setMessage({ text: "Erro ao aprovar chamado.", success: false });
      console.error("Erro ao aprovar chamado:", error);
    }
  };

  const handleReject = async (ticketId: number) => {
    try {
      const response = await axiosInstance.post(
        `/reject_ticket/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado recusado com sucesso!", success: true });
        setPendingTickets(pendingTickets.filter(ticket => ticket.id !== ticketId));
      }
    } catch (error) {
      setMessage({ text: "Erro ao recusar chamado.", success: false });
      console.error("Erro ao recusar chamado:", error);
    }
  };

  const handleShowDetails = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  return (
    <Container>
      <h1>Chamados Pendentes de Aprovação</h1>

      {message && <Message success={message.success}>{message.text}</Message>}

      <TicketList>
        {pendingTickets.length > 0 ? (
          pendingTickets.map(ticket => (
            <TicketItem key={ticket.id}>
              <h3>{ticket.ticket_type} - {ticket.submotive}</h3>
              <Button onClick={() => handleShowDetails(ticket)}>Ver Detalhes</Button>
              <Button onClick={() => handleApprove(ticket.id)}>Aprovar</Button>
              <Button onClick={() => handleReject(ticket.id)}>Recusar</Button>
            </TicketItem>
          ))
        ) : (
          <p>Não há chamados pendentes.</p>
        )}
      </TicketList>

      {selectedTicket && (
        <TicketDetails>
          <h3>Detalhes do Chamado</h3>
          <pre>{JSON.stringify(selectedTicket, null, 2)}</pre>
        </TicketDetails>
      )}
    </Container>
  );
};

export default ApprovalPage;

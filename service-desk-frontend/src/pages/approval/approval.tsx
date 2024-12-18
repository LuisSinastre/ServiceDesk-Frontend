// src/pages/approval/approval.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container, TicketList, TicketItem, TicketDetails, Message, HomeButton } from "./styles";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";  // Importando o componente FormField

const ApprovalPage: React.FC = () => {
  const { token } = useAuth();
  const [pendingTickets, setPendingTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>(""); // Motivo da reprovação
  const [isRejecting, setIsRejecting] = useState<boolean>(false); // Novo estado para controlar reprovação
  const navigate = useNavigate();

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
          setMessage({ text: "Erro ao buscar chamados pendentes.", success: false });
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
        setPendingTickets(pendingTickets.filter(ticket => ticket.ticket !== ticketId));
      }
    } catch (error) {
      setMessage({ text: "Erro ao aprovar chamado.", success: false });
    }
  };

  const handleReject = async (ticketId: number) => {
    if (!rejectionReason.trim()) {
      setMessage({ text: "Por favor, insira o motivo da reprovação.", success: false });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/reject_ticket/${ticketId}`,
        { rejection_reason: rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado recusado com sucesso!", success: true });
        setPendingTickets(pendingTickets.filter(ticket => ticket.ticket !== ticketId));
        setRejectionReason("");
        setIsRejecting(false);
        setSelectedTicket(null);
      }
    } catch (error) {
      setMessage({ text: "Erro ao recusar chamado.", success: false });
    }
  };

  const handleShowDetails = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsRejecting(false); // Resetar o estado de reprovação ao exibir detalhes
  };

  const handleStartRejection = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsRejecting(true); // Ativar o modo de reprovação
  };

  return (
    <Container>
      <h1>Chamados Pendentes de Aprovação</h1>
      <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>

      {message && <Message success={message.success}>{message.text}</Message>}

      {selectedTicket && (
        <TicketDetails>
          <p><strong>Chamado:</strong> {selectedTicket.ticket}</p>
          <p><strong>Motivo/Submotivo:</strong> {selectedTicket.motive_submotive}</p>
          
          {selectedTicket.form && (
            <>
              {Object.entries(selectedTicket.form).map(([key, value]) => (
                <FormField key={key} label={key} value={value && typeof value === "object" ? JSON.stringify(value) : value || "N/A"} />
              ))}
            </>
          )}

          {/* Outras informações do chamado podem ser exibidas aqui */}

          {isRejecting ? (
            <>
              <textarea
                placeholder="Insira o motivo da reprovação"
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
              />
              <Button onClick={() => handleReject(selectedTicket.ticket)}>Confirmar Reprovação</Button>
            </>
          ) : (
            <Button onClick={() => setSelectedTicket(null)}>Fechar</Button>
          )}
        </TicketDetails>
      )}
      
      <TicketList>
        {pendingTickets.length > 0 ? (
          pendingTickets.map(ticket => (
            <TicketItem key={ticket.ticket}>
              <h3>#{ticket.ticket} - {ticket.motive_submotive}</h3>
              <Button onClick={() => handleShowDetails(ticket)}>Ver Detalhes</Button>
              <Button onClick={() => handleApprove(ticket.ticket)}>Aprovar</Button>
              <Button onClick={() => handleStartRejection(ticket)}>Recusar</Button>
            </TicketItem>
          ))
        ) : (
          <p>Não há chamados pendentes.</p>
        )}
      </TicketList>
    </Container>
  );
};

export default ApprovalPage;

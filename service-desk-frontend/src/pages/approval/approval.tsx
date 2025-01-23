// src/pages/approval/approval.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { routes } from "../../api/routes";  // Caminho relativo
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container, TicketList, TicketItem, Message, HomeButton } from "./styles";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";  // Importando o componente FormField

const ApprovalPage: React.FC = () => {
  const { token } = useAuth();
  const [pendingTickets, setPendingTickets] = useState<any[]>([]);  // Estado para armazenar os chamados pendentes
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);  // Estado para armazenar o chamado selecionado
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);  // Estado para armazenar mensagens de sucesso ou erro
  const [rejectionReason, setRejectionReason] = useState<string>("");  // Estado para armazenar o motivo da reprovação
  const [rejectionReasons, setRejectionReasons] = useState<string[]>([]);  // Novo estado para armazenar os motivos de reprovação (que virão do backend)
  const [isRejecting, setIsRejecting] = useState<boolean>(false);  // Novo estado para controlar o modo de reprovação
  const navigate = useNavigate();

  // useEffect para carregar dados assim que o componente for montado
  useEffect(() => {
    // Função para buscar os motivos de reprovação do backend
    const fetchRejectionReasons = async () => {
      try {
        const response = await axiosInstance.get(routes.approval.get_rejection_reasons, {
          headers: {
          Authorization: `Bearer ${token}`, // Inclui o token de autenticação
        },
      });
      setRejectionReasons(response.data.rejection_reasons); // Armazena os motivos no estado rejectionReasons
      } catch (error) {
        setMessage({ text: "Erro ao buscar motivos de reprovação.", success: false });  // Mensagem de erro caso algo falhe
      }
    };

    // Função para buscar os chamados pendentes de aprovação
    const fetchPendingTickets = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get(routes.approval.pending_tickets, {
            headers: {
              Authorization: `Bearer ${token}`, // Inclui o token de autenticação
            },
          });
          setPendingTickets(response.data);  // Armazena os chamados pendentes no estado pendingTickets
        } catch (error) {
          setMessage({ text: "Erro ao buscar chamados pendentes.", success: false });
        }
      }
    };

    fetchRejectionReasons();  // Chama a função para buscar os motivos de reprovação
    fetchPendingTickets();  // Chama a função para buscar os chamados pendentes
  }, [token]);

  // Função para aprovar um chamado
  const handleApprove = async (ticketId: number) => {
    try {
      const response = await axiosInstance.post(
        `${routes.approval.approve_tickets}/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado aprovado com sucesso!", success: true });
        setPendingTickets(pendingTickets.filter(ticket => ticket.ticket !== ticketId));  // Remove o chamado aprovado da lista de pendentes
      }
    } catch (error) {
      setMessage({ text: "Erro ao aprovar chamado.", success: false });
    }
  };

  // Função para recusar um chamado
  const handleReject = async (ticketId: number) => {
    if (!rejectionReason.trim()) {  // Verifica se um motivo de reprovação foi selecionado
      setMessage({ text: "Por favor, insira o motivo da reprovação.", success: false });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${routes.approval.reject_ticket}/${ticketId}`,
        { rejection_reason: rejectionReason },  // Envia o motivo de reprovação
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado recusado com sucesso!", success: true });
        setPendingTickets(pendingTickets.filter(ticket => ticket.ticket !== ticketId));  // Remove o chamado recusado da lista de pendentes
        setRejectionReason("");  // Limpa o campo de motivo após a reprovação
        setIsRejecting(false);  // Desativa o modo de reprovação
        setSelectedTicket(null);  // Fecha a visualização do chamado
      }
    } catch (error) {
      setMessage({ text: "Erro ao recusar chamado.", success: false });
    }
  };


  // Função para iniciar a reprovação de um chamado
  const handleStartRejection = (ticket: any) => {
    setSelectedTicket(ticket);  // Armazena o chamado selecionado
    setIsRejecting(true);  // Ativa o modo de reprovação
  };

  return (
    <Container>
      <h1>Chamados Pendentes de Aprovação</h1>
      <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>
  
      {message && <Message success={message.success}>{message.text}</Message>}  {/* Exibe a mensagem de sucesso ou erro */}
  
      <TicketList>
        {pendingTickets.length > 0 ? (
          pendingTickets.map(ticket => (
            <TicketItem key={ticket.ticket}>
              <h3>#{ticket.ticket} - {ticket.motive_submotive}</h3>
              <div>
                {ticket.form &&
                  Object.entries(ticket.form).map(([key, value]) => (
                    <FormField key={key} label={key} value={value} />
                  ))}
              </div>
              <div><strong>User:</strong> {ticket.user}</div>
              <div><strong>Name:</strong> {ticket.name}</div>
              <div><strong>Manager:</strong> {ticket.manager}</div>
              <div><strong>Open Date:</strong> {ticket.ticket_open_date_time}</div>
              <div><strong>Status:</strong> {ticket.ticket_status}</div>
  
              {isRejecting && selectedTicket?.ticket === ticket.ticket ? (
                <>
                  <label htmlFor="rejectionReason">Motivo da Reprovação:</label>
                  <select
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={e => setRejectionReason(e.target.value)}  // Atualiza o motivo de reprovação selecionado
                  >
                    <option value="">Selecione um motivo</option>
                    {rejectionReasons.map((reason, index) => (
                      <option key={index} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                  <Button onClick={() => handleReject(ticket.ticket)}>Confirmar Reprovação</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleApprove(ticket.ticket)}>Aprovar</Button>
                  <Button onClick={() => handleStartRejection(ticket)}>Recusar</Button>
                </>
              )}
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

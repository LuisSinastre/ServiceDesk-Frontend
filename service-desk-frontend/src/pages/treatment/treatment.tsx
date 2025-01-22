// src/pages/treatment/treatment.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { routes } from "../../api/routes";  // Caminho relativo
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container, TicketList, TicketItem, TicketDetails, Message, HomeButton } from "./styles";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";  // Importando o componente FormField

const ApprovalPage: React.FC = () => {
  const { token } = useAuth();
  const [processingTickets, setProcessingTickets] = useState<any[]>([]);  // Estado para armazenar os chamados para tratamento
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);  // Estado para armazenar o chamado selecionado
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);  // Estado para armazenar mensagens de sucesso ou erro
  const [observation, setObservation] = useState<string>(""); // Observação do usuário ao tratar o chamado
  const [cancelReason, setCancelReason] = useState<string>("");  // Estado para armazenar o motivo de cancelamento selecionado pelo usuário
  const [cancelReasons, setCancelReasons] = useState<string[]>([]);  // Estado para armazenar os motivos de cancelamento do backend
  const [isCancelling, setIsCancelling] = useState<boolean>(false);  // Estado para controlar o modo de cancelamento
  const [isTreating, setIsTreating] = useState<boolean>(false); // Estado para controlar o modo de tratamento
  const navigate = useNavigate();

  // useEffect para carregar dados assim que o componente for montado
  useEffect(() => {
    // Função para buscar os motivos de cancelamento do backend
    const fetchCancelReasons = async () => {
      try {
        const response = await axiosInstance.get(routes.treatment.get_cancel_reasons, {
          headers: {
          Authorization: `Bearer ${token}`, // Inclui o token de autenticação
        },
      });
      setCancelReasons(response.data.cancel_reasons); // Armazena os motivos no estado cancelReasons
      } catch (error) {
        setMessage({ text: "Erro ao buscar motivos de reprovação.", success: false });  // Mensagem de erro caso algo falhe
      }
    };

    // Função para buscar os chamados pendentes de aprovação
    const fetchProcessingTickets = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get(routes.treatment.processing_tickets, {
            headers: {
              Authorization: `Bearer ${token}`, // Inclui o token de autenticação
            },
          });
          setProcessingTickets(response.data);  // Armazena os chamados pendentes no estado pendingTickets
        } catch (error) {
          setMessage({ text: "Erro ao buscar chamados pendentes.", success: false });
        }
      }
    };

    fetchCancelReasons();  // Chama a função para buscar os motivos de cancelamento
    fetchProcessingTickets();  // Chama a função para buscar os chamados pendentes
  }, [token]);

  // Função para aprovar um chamado
  const handleTreat = async () => {
    if (!observation.trim()) {  // Verifica se a observação foi preenchida
        setMessage({ text: "Por favor, insira uma observação.", success: false });
        return;
      }
    try {
      const response = await axiosInstance.post(
        `${routes.treatment.treat_ticket}/${selectedTicket.ticket}`,
        { observation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado tratado com sucesso!", success: true });
        setProcessingTickets(processingTickets.filter(ticket => ticket.ticket !== selectedTicket.ticket)); // Remove o chamado tratado
        setSelectedTicket(null); // Limpa o estado
        setIsTreating(false); // Sai do modo de tratamento
        setObservation(""); // Limpa a observação
      }
    } catch (error) {
      setMessage({ text: "Erro ao aprovar chamado.", success: false });
    }
  };

  // Função para recusar um chamado
  const handleCancel = async () => {
    if (!cancelReason.trim()) {  // Verifica se um motivo de reprovação foi selecionado
      setMessage({ text: "Por favor, insira o motivo da reprovação.", success: false });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${routes.treatment.cancel_ticket}/${selectedTicket.ticket}`,
        { cancelReason: cancelReason },  // Envia o motivo de reprovação
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage({ text: "Chamado cancelado com sucesso!", success: true });
        setProcessingTickets(processingTickets.filter(ticket => ticket.ticket !== selectedTicket.ticket));  // Remove o chamado recusado da lista de pendentes
        setCancelReason("");  // Limpa o campo de motivo após a reprovação
        setIsCancelling(false);  // Desativa o modo de reprovação
        setSelectedTicket(null);  // Fecha a visualização do chamado
      }
    } catch (error) {
      setMessage({ text: "Erro ao recusar chamado.", success: false });
    }
  };


    // Função para iniciar a reprovação de um chamado
    const handleStartRejection = (ticket: any) => {
        setSelectedTicket(ticket);  // Armazena o chamado selecionado
        setIsCancelling(true);  // Ativa o modo de reprovação
        setIsTreating(false);
    };

    // Função para iniciar o tratamento de um chamado
    const handleStartTreatment = (ticket: any) => {
        setSelectedTicket(ticket);  // Armazena o chamado selecionado
        setIsTreating(true);  // Ativa o modo de tratamento
        setIsCancelling(false);
    };

  return (
    <Container>
      <h1>Chamados na fila de tratamento</h1>
      <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>
  
      {message && <Message success={message.success}>{message.text}</Message>} {/* Exibe a mensagem de sucesso ou erro */}
  
      <TicketList>
        {processingTickets.length > 0 ? (
          processingTickets.map((ticket) => (
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
  
              {/* Renderiza os botões ou formulários dependendo do estado */}
              {selectedTicket?.ticket === ticket.ticket ? (
                <>
                  {isCancelling ? (
                    <>
                      <label htmlFor="cancelReason">Motivo da Reprovação:</label>
                      <select
                        id="cancelReason"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                      >
                        <option value="">Selecione um motivo</option>
                        {cancelReasons.map((reason, index) => (
                          <option key={index} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                      <div style={{ marginTop: "10px" }}>
                        <Button onClick={handleCancel}>Confirmar</Button>
                        <Button onClick={() => setIsCancelling(false)}>Fechar</Button>
                      </div>
                    </>
                  ) : isTreating ? (
                    <>
                      <label htmlFor="observation">Observação:</label>
                      <textarea
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        rows={4}
                        placeholder="Insira uma observação sobre o chamado..."
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button onClick={handleTreat}>Confirmar</Button>
                        <Button onClick={() => setIsTreating(false)}>Fechar</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleStartTreatment(ticket)}>Tratar</Button>
                      <Button onClick={() => handleStartRejection(ticket)}>Cancelar</Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Button onClick={() => handleStartTreatment(ticket)}>Tratar</Button>
                  <Button onClick={() => handleStartRejection(ticket)}>Cancelar</Button>
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

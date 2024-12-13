// src/pages/opening/opening.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import TicketForm from "./ticketform";
import { Container, Content, TypeList, TypeCard, HomeButton } from "./styles";

// Interfaces
interface Ticket {
  id: number;
  ticket_type: string;
  submotive: string;
  form: Record<string, string>;
}

interface GroupedTickets {
  [type: string]: Ticket[];
}

const OpeningPage: React.FC = () => {
  const { token } = useAuth();
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets>({});
  const [selectedType, setSelectedType] = useState<Ticket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("/ticket_types", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Log da resposta da API para verificação
          console.log("Resposta da API:", response.data);

          const grouped = response.data.reduce((acc: GroupedTickets, ticket: Ticket) => {
            console.log("ticket.ticket_type:", ticket.ticket_type);  // Verificar se ticket_type está vindo corretamente
            if (!acc[ticket.ticket_type]) {
              acc[ticket.ticket_type] = [];
            }
            acc[ticket.ticket_type].push(ticket);
            return acc;
          }, {});

          setGroupedTickets(grouped);
        } catch (error) {
          console.error("Erro ao buscar tipos de chamados:", error);
        }
      }
    };

    fetchTickets();
  }, [token]);

  const handleTicketTypeClick = (ticket: Ticket) => {
    console.log("Tipo de chamado selecionado:", ticket);  // Verifique qual ticket foi selecionado
    setSelectedType(ticket);
  };

  return (
    <Container>
      <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>
      <h1>Tipos de Chamados Disponíveis</h1>
      <Content>
        {Object.keys(groupedTickets).length > 0 ? (
          Object.keys(groupedTickets).map((type) => (
            <div key={type}>
              <h2>{type}</h2>
              <TypeList>
                {groupedTickets[type].map((ticket) => (
                  <TypeCard
                    key={ticket.id}
                    onClick={() => handleTicketTypeClick(ticket)}
                  >
                    {ticket.submotive}
                  </TypeCard>
                ))}
              </TypeList>
            </div>
          ))
        ) : (
          <p>Carregando...</p>
        )}
        {selectedType && (
          <div>
            <h2>Preencha o formulário para: {selectedType.ticket_type} - {selectedType.submotive}</h2>
            <TicketForm selectedTicket={selectedType} />
          </div>
        )}
      </Content>
    </Container>
  );
};

export default OpeningPage;

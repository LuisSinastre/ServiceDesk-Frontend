import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axios";
import { routes } from "../../api/routes";
import {
  Container,
  Title,
  SearchBox,
  Input,
  Button,
  TicketList,
  TicketItem,
  NoResultsMessage,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./styles";

interface Ticket {
  ticket_number: number;
  ticket_status: string;
  ticket_open_date_time: string;
  ticket_type: string;
  submotive: string;
  form: Record<string, string>;
  user: number;
}

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get(
          routes.requisitions.list_tickets,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              search: "",
            },
          }
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      }
    };

    fetchTickets();
  }, [isAuthenticated, navigate, token]);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        routes.requisitions.list_tickets,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { search },
        }
      );
      setTickets(response.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  };

  const handleClickDetails = async (ticketNumber: number) => {
    try {
      const response = await axiosInstance.get(
        `${routes.requisitions.ticket_detail}/${ticketNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const ticketDetails = response.data;
      setSelectedTicket(ticketDetails);
      setFormData(ticketDetails.form); // Carregar dados do formulário no modal
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar detalhes do chamado:", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
    setFormData({});
  };

  return (
    <Container>
      <Title>Buscar Chamados</Title><Button onClick={() => navigate("/")}>Ir para Home</Button>
      <SearchBox>
        <Input
          type="text"
          placeholder="Digite para buscar por número, tipo ou submotivo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </SearchBox>
  
        <TicketList>
        {tickets.length === 0 ? (
          <NoResultsMessage>Nenhum chamado encontrado.</NoResultsMessage>
        ) : (
          tickets.map((ticket) => (
            <TicketItem
              key={ticket.ticket_number}
              onClick={() => handleClickDetails(ticket.ticket_number)}
            >
              <div className="ticket-number">
                <strong>Chamado #{ticket.ticket_number}</strong>
              </div>
              <div>Tipo: {ticket.ticket_type}</div>
              <div>Submotivo: {ticket.submotive}</div>
            </TicketItem>
          ))
        )}
      </TicketList>
  
      {showModal && selectedTicket && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>Detalhes do Chamado</h2>
            </ModalHeader>
            <ModalBody>
              <form>
                <div>
                  <label>Número do Chamado:</label>
                  <input
                    type="text"
                    value={selectedTicket.ticket_number}
                    readOnly
                  />
                </div>
                <div>
                  <label>Tipo:</label>
                  <input
                    type="text"
                    value={selectedTicket.ticket_type}
                    readOnly
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <input
                    type="text"
                    value={selectedTicket.ticket_status}
                    readOnly
                  />
                </div>
                <div>
                  <label>Data Hora Abertura:</label>
                  <input
                    type="text"
                    value={selectedTicket.ticket_open_date_time}
                    readOnly
                  />
                </div>
                <div>
                  <label>Submotivo:</label>
                  <input
                    type="text"
                    value={selectedTicket.submotive}
                    readOnly
                  />
                </div>
                <div>
                  <label>Usuário:</label>
                  <input
                    type="text"
                    value={selectedTicket.user}
                    readOnly
                  />
                </div>
                <div>
                  <h3>Dados do Formulário</h3>
                  {Object.keys(formData).map((key) => (
                    <div key={key}>
                      <label>{key}:</label>
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleFormChange}
                      />
                    </div>
                  ))}
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeModal}>Fechar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Search;

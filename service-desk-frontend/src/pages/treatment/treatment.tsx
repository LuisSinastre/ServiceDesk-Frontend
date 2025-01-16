// src/pages/treatment/treatment.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { routes } from "../../api/routes";
import { HomeButton, Container, TicketList, TicketItem, ButtonGroup, ActionButton } from "../treatment/styles";
import FormDetails from "../treatment/formDetails";






const TreatmentPage: React.FC = () => {
    const { token } = useAuth();
    const [processingTickets, setProcessingTicket] = useState<any[]>([]);
    const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
    const navigate = useNavigate();

    useEffect(() => { 

        const fetchsetProcessingTicket = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get(routes.treatment.processing_tickets, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProcessingTicket(response.data);
                } catch (error) {
                    setMessage({text: "Erro ao buscar chamados em processamento", success: false});
                }
            }
        }
        fetchsetProcessingTicket();

    }, [token]);

    const handleTreat = (ticketId: string) => {
        console.log(`Tratando chamado: ${ticketId}`);
        // Adicione aqui a lógica para tratar o chamado
    };

    const handleCancel = (ticketId: string) => {
        console.log(`Cancelando chamado: ${ticketId}`);
        // Adicione aqui a lógica para cancelar o chamado
    };

    
    return (
        <Container>
            <h1>Chamados na esteira</h1>
            <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>
            
            <TicketList>
                {processingTickets.length > 0 ? (
                    processingTickets.map((ticket) => (
                        <TicketItem key={ticket.ticket}>
                            <h3>#{ticket.ticket} - {ticket.motive_submotive}</h3>
                            <div>
                                <FormDetails form={ticket.form} />
                            </div>
                            <div><strong>User:</strong> {ticket.user}</div>
                            <div><strong>Name:</strong> {ticket.name}</div>
                            <div><strong>Manager:</strong> {ticket.manager}</div>
                            <div><strong>Open Date:</strong> {ticket.ticket_open_date_time}</div>
                            <div><strong>Status:</strong> {ticket.ticket_status}</div>
                            <ButtonGroup>
                                <ActionButton onClick={() => handleTreat(ticket.ticket)}>Tratar</ActionButton>
                                <ActionButton onClick={() => handleCancel(ticket.ticket)}>Cancelar</ActionButton>
                            </ButtonGroup>
                        </TicketItem>
                    ))
                ) : (
                    <p>Não há chamados a serem tratados.</p>
                )}
            </TicketList>
        </Container>
    );
    

};


export default TreatmentPage;


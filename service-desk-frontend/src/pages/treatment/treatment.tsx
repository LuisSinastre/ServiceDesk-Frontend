// src/pages/treatment/treatment.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { routes } from "../../api/routes";
import { HomeButton, Container, TicketList, TicketItem } from "../treatment/styles";





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



    return (
        <Container>
            <h1>Chamados na esteira</h1>
            <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>
            
            <TicketList>
                {processingTickets.length > 0 ? (
                    processingTickets.map(ticket => (
                        <TicketItem key={ticket.ticket}>
                            <h3>#{ticket.ticket} - {ticket.motive_submotive}</h3>
                        </TicketItem>
                    ))
                ) : (
                    <p>Não há chamado a serem tratados.</p>
                )}
            </TicketList>
        </Container>
    );

};


export default TreatmentPage;


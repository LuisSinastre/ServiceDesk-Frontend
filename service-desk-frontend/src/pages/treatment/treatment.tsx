import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { routes } from "../../api/routes";
import { HomeButton, Container, TicketList, TicketItem, ButtonGroup, ActionButton } from "../treatment/styles";
import FormDetails from "./formDetails";

const TreatmentPage: React.FC = () => {
    const { token } = useAuth();
    const [processingTickets, setProcessingTicket] = useState<any[]>([]);
    const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<number | null>(null); // Chamado selecionado
    const [observation, setObservation] = useState<string>(""); // Observação do usuário
    const [isTreating, setIsTreating] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcessingTickets = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get(routes.treatment.processing_tickets, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProcessingTicket(response.data);
                } catch (error) {
                    setMessage({ text: "Erro ao buscar chamados em processamento", success: false });
                }
            }
        };
        fetchProcessingTickets();
    }, [token]);

    const handleTreat = async () => {
        if (!selectedTicket) return;
        setIsTreating(true);

        try {
            const response = await axiosInstance.post(
                `${routes.treatment.treat_ticket}/${selectedTicket}`,
                { observation },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage({ text: "Chamado tratado com sucesso!", success: true });
                setProcessingTicket(processingTickets.filter(ticket => ticket.ticket !== selectedTicket));
            }
        } catch (error) {
            setMessage({ text: "Erro ao tratar o chamado.", success: false });
        } finally {
            setIsTreating(false);
            setSelectedTicket(null); // Limpa o chamado selecionado
            setObservation(""); // Limpa a observação
        }
    };

    const handleCancel = () => {
        setSelectedTicket(null); // Cancela o tratamento
        setObservation(""); // Limpa o campo de observação
    };

    return (
        <Container>
            <h1>Chamados na esteira</h1>
            <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>

            {message && <p style={{ color: message.success ? "green" : "red" }}>{message.text}</p>}

            <TicketList>
                {processingTickets.length > 0 ? (
                    processingTickets.map(ticket => (
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
                                {selectedTicket === ticket.ticket ? (
                                    <>
                                        <textarea
                                            value={observation}
                                            onChange={e => setObservation(e.target.value)}
                                            placeholder="Digite sua observação"
                                            rows={3}
                                            style={{ width: "100%", marginTop: "10px" }}
                                        />
                                        <ActionButton onClick={handleTreat} disabled={isTreating}>
                                            {isTreating ? "Processando..." : "Confirmar"}
                                        </ActionButton>
                                        <ActionButton onClick={handleCancel}>Cancelar</ActionButton>
                                    </>
                                ) : (
                                    <ActionButton onClick={() => setSelectedTicket(ticket.ticket)}>Tratar</ActionButton>
                                )}
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

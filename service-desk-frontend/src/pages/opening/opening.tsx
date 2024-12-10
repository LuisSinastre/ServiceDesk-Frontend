import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import TicketForm from "./ticketform";
import { Container, Content, TipoLista, TipoCard, HomeButton } from "./styles";

// Interfaces
interface Chamado {
  id: number;
  tipo_chamado: string;
  submotivo: string;
  formulario: Record<string, string>;
}

interface ChamadosAgrupados {
  [tipo: string]: Chamado[];
}

const Opening: React.FC = () => {
  const { token } = useAuth();
  const [chamadosAgrupados, setChamadosAgrupados] = useState<ChamadosAgrupados>({});
  const [selectedTipo, setSelectedTipo] = useState<Chamado | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChamados = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("/ticket_types", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Agrupando os chamados por tipo
          const agrupados = response.data.reduce((acc: ChamadosAgrupados, chamado: Chamado) => {
            if (!acc[chamado.tipo_chamado]) {
              acc[chamado.tipo_chamado] = [];
            }
            acc[chamado.tipo_chamado].push(chamado);
            return acc;
          }, {});

          setChamadosAgrupados(agrupados);
        } catch (error) {
          console.error("Erro ao buscar chamados:", error);
        }
      }
    };

    fetchChamados();
  }, [token]);

  const handleTipoChamadoClick = (chamado: Chamado) => {
    setSelectedTipo(chamado);
  };

  return (
    <Container>
      {/* Botão Home */}
      <HomeButton onClick={() => navigate("/home")}>Ir para Home</HomeButton>

      <h1>Tipos de Chamados Disponíveis</h1>
      <Content>
        {Object.keys(chamadosAgrupados).length > 0 ? (
          Object.keys(chamadosAgrupados).map((tipo) => (
            <div key={tipo}>
              <h2>{tipo}</h2>
              <TipoLista>
                {chamadosAgrupados[tipo].map((chamado) => (
                  <TipoCard
                    key={chamado.id}
                    onClick={() => handleTipoChamadoClick(chamado)}
                  >
                    {chamado.submotivo}
                  </TipoCard>
                ))}
              </TipoLista>
            </div>
          ))
        ) : (
          <p>Carregando...</p>
        )}

        {selectedTipo && (
          <div>
            <h2>Preencha o formulário para: {selectedTipo.tipo_chamado}</h2>
            <TicketForm tipoChamado={selectedTipo} />
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Opening;

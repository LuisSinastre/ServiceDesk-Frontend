import React, { useEffect, useState } from "react";
import { routes } from "../../api/routes";
import { useAuth } from "../../contexts/AuthContext";

interface Chamado {
  id: number;
  detalhamento: string;
}

const Opening: React.FC = () => {
  const { token } = useAuth(); // Recuperando token autenticado
  const [chamados, setChamados] = useState<Chamado[]>([]); // Declarando o tipo do estado

  useEffect(() => {
    const fetchChamados = async () => {
      if (token) {
        try {
          const response = await fetch(routes.requisitions.chamados, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao buscar chamados.");
          }

          const data: Chamado[] = await response.json();
          setChamados(data);
        } catch (error) {
          console.error("Erro ao buscar chamados:", error);
        }
      }
    };

    fetchChamados();
  }, [token]);

  return (
    <div>
      <h1>Lista de Chamados</h1>
      <ul>
        {chamados.length > 0 ? (
          chamados.map((chamado, index) => (
            <li key={index}>{chamado.detalhamento}</li>
          ))
        ) : (
          <li>Carregando dados...</li>
        )}
      </ul>
    </div>
  );
};

export default Opening;

import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import { FormContainer, InputField, Button, Message } from "./styles";

interface CampoFormulario {
  [key: string]: string;
}

interface TipoChamado {
  id: number;
  tipo_chamado: string;
  submotivo: string;
  formulario: CampoFormulario;
}

interface Props {
  tipoChamado: TipoChamado;
}

const TicketForm: React.FC<Props> = ({ tipoChamado }) => {
  const [formData, setFormData] = useState<CampoFormulario>({});
  const { token } = useAuth();
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      setMessage({ text: "Todos os campos devem ser preenchidos antes de enviar o chamado.", success: false });
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/open_ticket",
        {
          ticket_type: tipoChamado.tipo_chamado,
          submotivo: tipoChamado.submotivo,
          form: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setTicketNumber(response.data.ticket_number);
        setMessage({
          text: `Chamado aberto com sucesso! Número do chamado: ${response.data.ticket_number}`,
          success: true,
        });
      } else {
        setMessage({ text: "Erro desconhecido ao abrir o chamado.", success: false });
      }
    } catch (error) {
      console.error("Erro ao enviar chamado", error);
      setMessage({
        text: "Erro ao abrir o chamado.",
        success: false,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {Object.keys(tipoChamado.formulario).map((campoKey) => (
        <InputField key={campoKey}>
          <label>{tipoChamado.formulario[campoKey]}</label>
          <input
            name={campoKey}
            value={formData[campoKey] || ""}
            onChange={handleChange}
          />
        </InputField>
      ))}
      <Button type="submit">Enviar</Button>

      {message && <Message success={message.success}>{message.text}</Message>}
      {ticketNumber && (
        <div style={{ marginTop: "20px", color: "green" }}>
          Número do chamado aberto: {ticketNumber}
        </div>
      )}
    </FormContainer>
  );
};

export default TicketForm;

// src/pages/opening/ticketform.tsx
import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import { FormContainer, InputField, Button, Message } from "./styles";

interface FormField {
  [key: string]: string;
}

interface TicketType {
  id: number;
  ticket_type: string;
  submotive: string;
  motive_submotive: string;
  form: FormField;
}

interface Props {
  selectedTicket: TicketType;
}

const TicketForm: React.FC<Props> = ({ selectedTicket }) => {
  const [formData, setFormData] = useState<FormField>({});
  const { token } = useAuth();
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação se todos os campos foram preenchidos
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
          ticket_type: selectedTicket.ticket_type, 
          submotive: selectedTicket.submotive,
          motive_submotive: selectedTicket.motive_submotive,
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
      {Object.keys(selectedTicket.form).map((fieldKey) => (
        <InputField key={fieldKey}>
          <label>{selectedTicket.form[fieldKey]}</label>
          <input
            name={fieldKey}
            value={formData[fieldKey] || ""}
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

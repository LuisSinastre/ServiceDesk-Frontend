// src/api/routes.ts
export const API_URL = 'http://localhost:5000'; // Base URL da sua API

export const routes = {
  auth: {
    login: `${API_URL}/login`,        // Rota para login (POST)
    logout: `${API_URL}/logout`,      // Rota para logout (POST)
  },
  
  requisitions: {
    ticket_types: `${API_URL}/ticket_types`, // Rota para enviar a requisição para o back para puxar os chamados disponíveis
    list_tickets: `${API_URL}/list_tickets`, // Rota para listar os chamados abertos pelo usuário
    ticket_detail: `${API_URL}/ticket_detail`, // Rota para detalhamento dos chamados
  },

  approval: {
    pending_tickets: `${API_URL}/pending_approvals`, // Rota para aprovar o chamado selecionado
    approve_tickets: `${API_URL}/approve_ticket`, // Rota para aprovar o chamado selecionado
    reject_ticket: `${API_URL}/reject_ticket`, // Rota para reprovar o chamado selecionado
    get_rejection_reasons: `${API_URL}/get_rejection_reasons`, // Rota para pegar os motivos de reprovação
  },

  treatment: {
    processing_tickets: `${API_URL}/processing_tickets`, // Rota para aprovar o chamado selecionado
    treat_ticket: `${API_URL}/treat_ticket`, // Rota para aprovar o chamado selecionado
    get_cancel_reasons: `${API_URL}/get_cancel_reasons`, // Rota para trazer os motivos de cancelamento
    cancel_ticket: `${API_URL}/cancel_ticket`, // Rota para cancelar o chamado no tratamento
  },
};
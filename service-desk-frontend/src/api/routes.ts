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
};
// src/api/routes.ts
export const API_URL = 'http://localhost:5000'; // Base URL da sua API

export const routes = {
  auth: {
    login: `${API_URL}/login`,        // Rota para login (POST)
    logout: `${API_URL}/logout`,      // Rota para logout (POST)
  },
  requisitions: {
    chamados: `${API_URL}/chamados`, // Rota para enviar a requisição para o back para puxar os chamados disponíveis
  }
};

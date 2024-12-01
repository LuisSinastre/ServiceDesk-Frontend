// api/routes.ts
export const API_URL = 'https://api.exemplo.com'; // Base URL da sua API

// Definindo as rotas com agrupamento por tipo de operação
export const routes = {
  auth: {
    login: `${API_URL}/login`,        // Rota para login (POST)
    logout: `${API_URL}/logout`,      // Rota para logout (POST)
  },
  // users: {
  //   getAll: `${API_URL}/users`,       // Rota para obter todos os usuários (GET)
  //   getById: (id: string) => `${API_URL}/users/${id}`, // Rota para obter usuário por ID (GET)
  //   create: `${API_URL}/users`,       // Rota para criar um usuário (POST)
  //   update: (id: string) => `${API_URL}/users/${id}`, // Rota para atualizar usuário por ID (PUT)
  //   delete: (id: string) => `${API_URL}/users/${id}`, // Rota para excluir usuário por ID (DELETE)
  // },
};

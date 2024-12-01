// api/axios.ts
import axios, { AxiosInstance } from 'axios';
import { API_URL, routes } from './routes'; // Importando as rotas definidas

interface CustomAxiosInstance extends AxiosInstance {
  login: (username: string, password: string) => Promise<any>;
  getAllUsers: () => Promise<any>;
  createUser: (userData: { name: string; email: string }) => Promise<any>;
  updateUser: (id: string, userData: { name?: string; email?: string }) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;
}

// Criando a instância do Axios e atribuindo a interface CustomAxiosInstance
const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: API_URL, // Base URL
  timeout: 5000, // Tempo limite
}) as CustomAxiosInstance;

// Checa o localStorage para ver se há um token e o configura no cabeçalho Authorization
const token = localStorage.getItem("authToken");
if (token) {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
}

// Adicionando os métodos personalizados à instância do Axios
axiosInstance.login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(routes.auth.login, { username, password });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// axiosInstance.getAllUsers = async () => {
//   try {
//     const response = await axiosInstance.get(routes.users.getAll);
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao obter usuários:', error);
//     throw error;
//   }
// };

// axiosInstance.createUser = async (userData: { name: string; email: string }) => {
//   try {
//     const response = await axiosInstance.post(routes.users.create, userData);
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao criar usuário:', error);
//     throw error;
//   }
// };

// axiosInstance.updateUser = async (id: string, userData: { name?: string; email?: string }) => {
//   try {
//     const response = await axiosInstance.put(routes.users.update(id), userData);
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao atualizar usuário:', error);
//     throw error;
//   }
// };

// axiosInstance.deleteUser = async (id: string) => {
//   try {
//     const response = await axiosInstance.delete(routes.users.delete(id));
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao excluir usuário:', error);
//     throw error;
//   }
// };

export default axiosInstance;

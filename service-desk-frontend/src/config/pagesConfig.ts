// src/config/pagesConfig.ts

// Definindo a interface Page
export interface Page {
    allowed_page: string; // Nome da página
    id_page: number;      // ID da página
}

// Lista de páginas disponíveis
export const availablePages: Page[] = [
    { allowed_page: "ABERTURA", id_page: 1 },
    { allowed_page: "CONSULTA", id_page: 2 },
    { allowed_page: "CADASTRO", id_page: 3 },
    { allowed_page: "TRATAMENTO", id_page: 4 },
];
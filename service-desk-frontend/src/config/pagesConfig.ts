// src/config/pagesConfig.ts

// Definindo a interface Page
export interface Page {
    allowed_page: string;
    id_page: number;
    route: string
}

// Lista de páginas disponíveis
export const availablePages: Page[] = [
    { allowed_page: "ABERTURA", id_page: 1, route: "opening"},
    { allowed_page: "CONSULTA", id_page: 2, route: "search"},
    { allowed_page: "APROVACAO", id_page: 3, route: "approval"},
    { allowed_page: "CADASTRO", id_page: 3, route: "register"},
    { allowed_page: "TRATAMENTO", id_page: 4, route: "treatment"},
];
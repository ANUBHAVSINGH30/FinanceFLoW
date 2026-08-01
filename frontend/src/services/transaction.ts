import api from "../lib/axios";

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string;
    note: string | null;
    isRecurring: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface TransactionListResponse {
    transactions: Transaction[];
    pagination: Pagination;
}

export interface TransactionFilters {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    type?: "income" | "expense";
    startDate?: string;
    endDate?: string;
    sortBy?: "date" | "amount" | "title" | "category";
    orderBy?: "asc" | "desc";
}

export interface CreateTransactionData {
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string;
    note?: string;
    isRecurring?: boolean;
}

export const getRecentTransactions = async () => {
    const response = await api.get("/transactions?limit=5");
    return response.data.data.transactions;
};

export const getTransactions = async (filters: TransactionFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));
    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.type) params.append("type", filters.type);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.orderBy) params.append("orderBy", filters.orderBy);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);

    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data.data as TransactionListResponse;
};

export const createTransaction = async (data: CreateTransactionData) => {
    const response = await api.post("/transactions", data);
    return response.data.data as Transaction;
};

export const deleteTransaction = async (id: string) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
};

import api from "../lib/axios";

export interface Transactions {
    id: string,
    title: string,
    amount:  number,
    type: "income" | "expense",
    category: string,
    date: string,
    note: string,
    isRecurring: boolean
};

export const getRecentTransactions = async () => {
    const response = await api.get("/transactions?limit=5");
    return response.data.data.transactions;
};
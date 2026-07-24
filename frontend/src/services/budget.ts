import api from "../lib/axios";

export interface Budget {
    id: string,
    category: string,
    amount: number,
    month: number,
    year: number,
    spend: number,
    remaining: number,
    percentageUsed: number,
    status: string
};

export const getBudget = async () => {
    const response = await api.get("/budget");
    return response.data.data;
}
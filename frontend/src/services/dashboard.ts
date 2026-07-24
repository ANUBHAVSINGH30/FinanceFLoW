import api from "../lib/axios";

export interface DashboardSummary {
    totalIncome : number,
    totalExpense: number,
    transactionCount: number,
    balance: number
}

export const getDashboardSummary = async () => {
    const response = await api.get("/dashboard/summary");
    return response.data.data;
};

export const getCategoryBreakdown = async () => {
    const response = await api.get("/dashboard/category-breakdown");
    return response.data;
};

export const getMonthlyTrend = async () => {
    const response = await api.get("/dashboard/monthly-trend");
    return response.data;
};
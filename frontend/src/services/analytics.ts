import api from "../lib/axios";

export interface AnalyticsSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

export interface AnalyticsFilters {
  month?: number;
  year?: number;
}

export const getAnalyticsSummary = async (filters: AnalyticsFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.month) params.append("month", String(filters.month));
  if (filters.year) params.append("year", String(filters.year));
  const response = await api.get(`/dashboard/summary?${params.toString()}`);
  return response.data.data as AnalyticsSummary;
};

export const getAnalyticsCategoryBreakdown = async (filters: AnalyticsFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.month) params.append("month", String(filters.month));
  if (filters.year) params.append("year", String(filters.year));
  const response = await api.get(`/dashboard/category-breakdown?${params.toString()}`);
  return response.data.data as CategoryBreakdown[];
};

export const getAnalyticsMonthlyTrend = async (year?: number) => {
  const params = new URLSearchParams();
  if (year) params.append("year", String(year));
  const response = await api.get(`/dashboard/monthly-trend?${params.toString()}`);
  return response.data.data as MonthlyTrend[];
};
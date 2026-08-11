import api from "../lib/axios";

export interface Budget {
    id: string,
    category: string,
    amount: number,
    month: number,
    year: number,
    spent: number,
    remaining: number,
    percentageUsed: number,
    status: string
};

export interface CreateBudgetPayload {
  category: string;
  amount: number;
  month: string;
  year: string
}

export const createBudget = async (data: CreateBudgetPayload) => {
  const response = await api.post("/budget", data);
  return response.data;
};

export const getBudget = async () => {
    const response = await api.get("/budget");
    return response.data.data;
}

export const updateBudget = async (
  id: string,
  data: Partial<CreateBudgetPayload>
) => {
  const response = await api.put(`/budget/${id}`, data);
  return response.data.data;
};

export const deleteBudget = async (id: string) => {
  const response = await api.delete(`/budget/${id}`);
  return response.data;
};
import api from "../lib/axios";

export interface SignUpData {
    name: string,
    email: string,
    password: string
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
};

export const signIn = async (data: SignInData) => {
    const response = await api.post("/auth/signin", data);
    return response.data;
} 
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  currency: string;
  createdAt: string;
}

export interface UpdateProfileData {
  name?: string;
  currency?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const signUp = async (data: SignUpData) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
};

export const signIn = async (data: SignInData) => {
    const response = await api.post("/auth/signin", data);
    return response.data;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/auth/me");
  return response.data.data;
}

export const updateProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  const response = await api.put("/auth/me", data);
  return response.data.data;
}

export const changePassword = async (data: ChangePasswordData) => {
  const response = await api.put("/auth/password", data);
  return response.data;
}
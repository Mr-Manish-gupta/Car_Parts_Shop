import { api } from "./api";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/user";

export const authService = {
  // 1. Login API Call
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  // 2. Register API Call
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },
};
export type Role = "USER" | "SELLER" | "ADMIN";

export interface User {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  role: Role;
  name?: string;
  email?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
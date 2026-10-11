"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginRequest, RegisterRequest } from "@/types/user";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Helper to get email-specific avatar key
  const getAvatarKey = (email?: string) => {
    if (!email) return null;
    return `user_profile_avatar_${email.trim().toLowerCase()}`;
  };

  // On initial page load: check if token and user exist in localStorage
  useEffect(() => {
    try {
      // Clean up legacy generic avatar key to prevent cross-account leaks
      localStorage.removeItem("user_profile_avatar");

      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        const parsed: User = JSON.parse(savedUser);
        
        if (parsed.email) {
          const key = getAvatarKey(parsed.email);
          if (key) {
            const savedAvatar = localStorage.getItem(key);
            if (savedAvatar) {
              parsed.avatar = savedAvatar;
            }
          }
        }

        // If parsed name was previously the email prefix, recover real name from JWT payload
        if (savedToken && (!parsed.name || parsed.name === parsed.email?.split("@")[0].toUpperCase() || parsed.name === parsed.email?.split("@")[0])) {
          try {
            const payload = JSON.parse(atob(savedToken.split(".")[1]));
            if (payload.name) {
              parsed.name = payload.name;
              localStorage.setItem("user", JSON.stringify(parsed));
            }
          } catch (err) {
            // ignore
          }
        }

        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to parse saved user", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 1. Handle Login
  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      const token = res.accessToken;

      // Extract real user name from backend response or JWT payload
      let realName = res.name;
      if (!realName) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.name) realName = payload.name;
        } catch (err) {
          // ignore
        }
      }

      const displayName = realName || data.email.split("@")[0];
      const avatarKey = getAvatarKey(data.email);
      const savedAvatar = avatarKey ? localStorage.getItem(avatarKey) || undefined : undefined;

      const loggedInUser: User = {
        name: displayName,
        email: data.email,
        role: res.role,
        avatar: savedAvatar,
      };

      setToken(token);
      setUser(loggedInUser);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Redirect based on role
      if (res.role === "ADMIN") {
        router.push("/admin");
      } else if (res.role === "SELLER") {
        router.push("/seller");
      } else {
        router.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Register
  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      // Auto-login after registration (new accounts start with clean avatar)
      const res = await authService.login({ email: data.email, password: data.password });
      const token = res.accessToken;

      const loggedInUser: User = {
        name: res.name || data.name,
        email: data.email,
        role: res.role,
        avatar: undefined,
      };

      setToken(token);
      setUser(loggedInUser);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      if (res.role === "ADMIN") {
        router.push("/admin");
      } else if (res.role === "SELLER") {
        router.push("/seller");
      } else {
        router.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Update User
  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem("user", JSON.stringify(updated));
        if (data.avatar && prev.email) {
          const key = getAvatarKey(prev.email);
          if (key) {
            localStorage.setItem(key, data.avatar);
          }
        }
      } catch (e) {
        console.error("Failed to update user in storage", e);
      }
      return updated;
    });
  };

  // 4. Handle Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        updateUser,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

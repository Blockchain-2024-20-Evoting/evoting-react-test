import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  role: "STUDENT" | "ADMIN" | null;
  login: (
    email: string,
    password: string,
    role: "STUDENT" | "ADMIN"
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<"STUDENT" | "ADMIN" | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole as "STUDENT" | "ADMIN");
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "STUDENT" | "ADMIN"
  ) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        setIsAuthenticated(true);
        setRole(role);

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", role);
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
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

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  role: "STUDENT" | "ADMIN" | null; // Tipo de rol
  login: (
    email: string,
    password: string,
    role: "STUDENT" | "ADMIN"
  ) => Promise<void>; // Firma del login
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<"STUDENT" | "ADMIN" | null>(null); // Estado para el rol

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole"); // Obtener el rol del usuario de localStorage
    setIsAuthenticated(!!token);
    setRole(userRole ? (userRole as "STUDENT" | "ADMIN") : null); // Establecer el rol
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "STUDENT" | "ADMIN"
  ) => {
    try {
      // Hacer la solicitud de inicio de sesión
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Manejar la respuesta del servidor
      if (response.data.token) {
        setIsAuthenticated(true);
        setRole(role); // Establecer el rol pasado como argumento

        // Almacenar el token y el rol en localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", role);
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole"); // Eliminar el rol al cerrar sesión
    setIsAuthenticated(false);
    setRole(null); // Restablecer el rol
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

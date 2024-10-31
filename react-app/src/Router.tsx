// src/Router.tsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./screens/home/Home";
import LoginPage from "./screens/loginpage/LoginPage";
import { RouterLayout } from "./components/RouterLayout";
import { VotacionesPage } from "./screens/votaciones/Votaciones";
import { EstadisticasPage } from "./screens/estadisticas/Estadisticas";
import Dashboard from "./screens/dashboard/Dashboard";
import UsuariosForm from "./components/UserForm";
import CandidatosForm from "./components/CandidateAndPartyForm";
import EleccionesForm  from "./components/EleccionesForm";
import { useAuth } from "./contexts/AuthContext";

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/votaciones" element={<VotacionesPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="usuarios" element={<UsuariosForm />} />
          <Route path="candidatos" element={<CandidatosForm />} />
          <Route path="elecciones" element={<EleccionesForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

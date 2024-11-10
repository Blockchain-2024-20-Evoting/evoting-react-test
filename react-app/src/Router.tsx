import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./screens/home/Home";
import LoginPage from "./screens/loginpage/LoginPage";
import { RouterLayout } from "./components/RouterLayout";
import { VotacionesPage } from "./screens/usuario/votaciones/Votaciones";
import { EstadisticasPage } from "./screens/usuario/estadisticas/Estadisticas";
import { EleccionesPage } from "./screens/usuario/elecciones/Elecciones";
import Dashboard from "./screens/dashboard/Dashboard";
import UsuariosForm from "./components/UserForm";
import CandidatosForm from "./components/CandidateAndPartyForm";
import EleccionesForm from "./components/EleccionesForm";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element; requiredRole?: "ADMIN" | "STUDENT" }> = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/votaciones/:electionId" element={<VotacionesPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/elecciones" element={<EleccionesPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Dashboard />
            </ProtectedRoute>
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

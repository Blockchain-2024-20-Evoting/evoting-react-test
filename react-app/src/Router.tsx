import React from "react";
import { Route, Routes } from "react-router-dom";
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

export const AppRouter: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();


  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/votaciones" element={<VotacionesPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/elecciones" element={<EleccionesPage />} />
        <Route path="/login" element={<LoginPage />} />


        {/* Rutas protegidas */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
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

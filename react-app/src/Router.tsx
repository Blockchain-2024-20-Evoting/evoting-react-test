// src/Router.tsx
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

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/votaciones" element={<VotacionesPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/elecciones" element={<EleccionesPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas del dashboard sin protección */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="usuarios" element={<UsuariosForm />} />
          <Route path="candidatos" element={<CandidatosForm />} />
          <Route path="elecciones" element={<EleccionesForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

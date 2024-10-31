// src/Router.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/home/Home";
import { LoginPage } from "./screens/login/Login";
import { RouterLayout } from "./components/RouterLayout";
import { VotacionesPage } from "./screens/usuario/votaciones/Votaciones";

import Dashboard from "./screens/dashboard/Dashboard";
import UserForm from "./components/UserForm";
import CandidateAndPartyForm from "./components/CandidateAndPartyForm";
import EleccionesForm from "./components/EleccionesForm"; // Importa EleccionesForm
import { EstadisticasPage } from "./screens/usuario/estadisticas/Estadisticas";
import { EleccionesPage } from "./screens/usuario/elecciones/elecciones";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/votaciones" element={<VotacionesPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/elecciones" element={<EleccionesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="usuarios" element={<UserForm />} />
          <Route path="candidatos" element={<CandidateAndPartyForm />} />
          <Route path="elecciones" element={<EleccionesForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

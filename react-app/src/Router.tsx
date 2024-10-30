// src/Router.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/home/Home";
import { LoginPage } from "./screens/login/Login";
import { RouterLayout } from "./components/RouterLayout";
import { VotacionesPage } from "./screens/votaciones/Votaciones";
import { EstadisticasPage } from "./screens/estadisticas/Estadisticas";
import Dashboard from "./screens/dashboard/Dashboard";
import UserForm from "./components/UserForm";
import CandidateAndPartyForm from "./components/CandidateAndPartyForm";
import EleccionesForm from "./components/EleccionesForm"; // Importa EleccionesForm

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/votaciones" element={<VotacionesPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="usuarios" element={<UserForm />} />
          <Route path="candidatos" element={<CandidateAndPartyForm />} />
          <Route path="elecciones" element={<EleccionesForm />} /> {/* Nueva ruta para EleccionesForm */}
        </Route>
      </Route>
    </Routes>
  );
};

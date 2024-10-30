import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/home/Home";
import { LoginPage } from "./screens/login/Login";
import { RouterLayout } from "./components/RouterLayout";
import { VotacionesPage } from "./screens/votaciones/Votaciones";
import { EstadisticasPage } from "./screens/estadisticas/Estadisticas";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/votaciones" element={<VotacionesPage />} />
        <Route path="/Estadisticas" element={<EstadisticasPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/home/Home";
import { LoginPage } from "./screens/login/Login";
import { RouterLayout } from "./components/RouterLayout";
import { VotacionesPage } from "./screens/votaciones/Votaciones";
import { EstadisticasPage } from "./screens/estadisticas/Estadisticas";
import { Box } from "@mui/material";
import "./index.css";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Box
      sx={{
        background: "#BFB0C5",
        minHeight: "100vh",
        fontFamily: "'Lexend Deca', sans-serif", // Corregido: 'fontfamily' a 'fontFamily'
        fontWeight: 500, // Corregido: 'font-weight' a 'fontWeight'
        fontStyle: "normal", // Corregido: 'font-style' a 'fontStyle'
      }}
    >
      <Routes>
        <Route path="/" element={<RouterLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/votaciones" element={<VotacionesPage />} />
          <Route path="/estadisticas" element={<EstadisticasPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Box>
  );
};

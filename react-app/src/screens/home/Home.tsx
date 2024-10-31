import React from "react";

import { Box, Container, Typography } from "@mui/material";

export const HomePage: React.FC<{}> = () => {
  return (
    <Box
      sx={{
        background: "#BFB0C5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Container sx={{ mb: { xs: 5, md: 10 } }} maxWidth="xl">
        <Typography
          sx={{
            fontFamily: "Lexend-mixed",
            fontSize: { xs: "32px", sm: "48px", md: "64px" }, // tamaño responsivo del texto
            color: "#ffffff",
            textAlign: "center",
            background: "#BFB0C5",
          }}
        >
          Somos una página encargada de llevar con total seguridad, confianza y
          transparencia tus votos!
        </Typography>
      </Container>

      <Box
        component="img"
        src="/src/assets/imagenInicio.svg"
        alt="Imagen de Inicio"
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%" }, // tamaño responsivo de la imagen
          maxWidth: "600px",
          mt: { xs: 3, md: 5 },
        }}
      />
    </Box>
  );
};

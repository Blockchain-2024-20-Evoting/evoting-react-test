import React from "react";
import Card, { CardBody } from "../../components/Card";
import { Box, Container, Typography } from "@mui/material";

export const HomePage: React.FC<{}> = () => {
  return (
    <Box sx={{ background: "#BFB0C5", minHeight: "100vh" }}>
      <Container sx={{ mt: 0}} maxWidth="xl">
        <Typography
          sx={{
            fontFamily: "Lexend-mixed",
            fontSize: "64px",
            color: "#ffffff",
            textAlign: "center",
            background: "#BFB0C5",
          }}
        >
          Somos una página encargada de llevar con total seguridad, confianza y
          transparencia tus votos!
        </Typography>
      </Container>
      <img src="/src/assets/imagenInicio.svg" alt="" />
    </Box>
  );
};

import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

const elecciones = [
  {
    titulo: "Elección 1",
    candidatos: [
      {
        nombre: "Luis Moreno",
        resultado: "30%",
        foto: "https://via.placeholder.com/40",
      },
      {
        nombre: "Pedro Pablo",
        resultado: "20%",
        foto: "https://via.placeholder.com/40",
      },
      {
        nombre: "Samiel Viaña",
        resultado: "50%",
        foto: "https://via.placeholder.com/40",
      },
    ],
  },
  {
    titulo: "Elección 2",
    candidatos: [
      {
        nombre: "Ana Pérez",
        resultado: "60%",
        foto: "https://via.placeholder.com/40",
      },
      {
        nombre: "Carlos Gómez",
        resultado: "25%",
        foto: "https://via.placeholder.com/40",
      },
      {
        nombre: "Lucía Torres",
        resultado: "15%",
        foto: "https://via.placeholder.com/40",
      },
    ],
  },
  {
    titulo: "Elección 3",
    candidatos: [
      {
        nombre: "Mario López",
        resultado: "40%",
        foto: "https://via.placeholder.com/40",
      },
      {
        nombre: "Sara Díaz",
        resultado: "35%",
        foto: "https://via.placeholder.com/40",
      },
      {
        nombre: "Juan Castro",
        resultado: "25%",
        foto: "https://via.placeholder.com/40",
      },
    ],
  },
];

export const EstadisticasPage: React.FC<{}> = () => {
  return (
    <Box sx={{ backgroundColor: "#EAEAEA", pt: 8, pb: 8 }}>
      <Container maxWidth="md">
        {elecciones.map((eleccion, index) => (
          <Card
            key={index}
            sx={{
              mb: 4,
              borderRadius: 5,
              backgroundColor: "#EAEAEA",
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ backgroundColor: "#47184D", borderRadius: 5 }}>
              <Typography
                variant="h5"
                component="div"
                marginBottom="1.5rem"
                color="white"
              >
                {eleccion.titulo}
              </Typography>
              {eleccion.candidatos
                .sort((a, b) => parseInt(b.resultado) - parseInt(a.resultado))
                .map((candidato, idx) => (
                  <Card
                    key={idx}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: "#EAEAEA",
                      boxShadow: "none",
                      mb: 1,
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={candidato.foto}
                          alt={candidato.nombre}
                          sx={{ mr: 2 }}
                        />
                        <Typography variant="body1">
                          {candidato.nombre}
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        {candidato.resultado}
                      </Typography>
                    </Box>
                  </Card>
                ))}
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

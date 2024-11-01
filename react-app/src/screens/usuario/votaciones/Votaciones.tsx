import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Avatar,
  Checkbox,
  Button,
} from "@mui/material";

export const VotacionesPage: React.FC<{}> = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const elecciones = [
    {
      partido: "Fuerza Popular",
      candidato: "Luis Moreno",
      logo: "/ruta/a/logoFuerzaPopular.png",
      foto: "/ruta/a/fotoLuisMoreno.png",
    },
    {
      partido: "Partido gluglugluglu",
      candidato: "Pedro Pablo",
      logo: "/ruta/a/logoGluglugluglu.png",
      foto: "/ruta/a/fotoPedroPablo.png",
    },
    {
      partido: "Perú Libre",
      candidato: "Samuel Viaña",
      logo: "/ruta/a/logoPeruLibre.png",
      foto: "/ruta/a/fotoSamuelViana.png",
    },
  ];

  const handleCheckboxChange = (index: number) => {
    // Permitir solo un checkbox seleccionado a la vez
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <Box sx={{ backgroundColor: "#EAEAEA", minHeight: "100vh", py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", mb: 1, ml: 5, maxWidth: "xl" }}
      >
        Elecciones
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        align="left"
        sx={{ color: "#757575", mb: 2, ml: 5 }}
      >
        Elección Presidente Facultad Derecho
      </Typography>

      <Container
        sx={{
          mt: 5,
          backgroundColor: "#47184D",
          py: 3,
          paddingLeft: 5,
          borderRadius: 2,
          maxWidth: "xl",
        }}
      >
        {elecciones.map((eleccion, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              boxShadow: 3,
              py: 0,
              backgroundColor: "#EAEAEA",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Contenedor para el logo y nombre del partido (parte superior) */}
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  mr: -3,
                  ml: -3,
                }}
              >
                <Avatar
                  src={eleccion.logo}
                  alt={`${eleccion.partido} logo`}
                  sx={{ width: 40, height: 40, mr: 2, mt: 1, ml: 1, mb: 1 }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {eleccion.partido}
                </Typography>
              </Card>

              {/* Contenedor para el candidato y el checkbox (parte inferior) */}
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mr: -3,
                  ml: -3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={eleccion.foto}
                    alt={eleccion.candidato}
                    sx={{ width: 40, height: 40, mr: 2, mt: 1, ml: 1, mb: 1 }}
                  />
                  <Typography>{eleccion.candidato}</Typography>
                </Box>
                <Checkbox
                  edge="end"
                  checked={selectedIndex === index}
                  onChange={() => handleCheckboxChange(index)}
                  sx={{ ml: 2, mr: 2 }}
                />
              </Card>
            </Container>
          </Card>
        ))}

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}
          >
            Guardar Voto
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

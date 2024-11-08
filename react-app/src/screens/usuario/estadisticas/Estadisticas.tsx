import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

// Define las interfaces de los datos de la API
interface Candidato {
  nombre: string;
  resultado: string;
  foto: string;
}

interface Eleccion {
  id: number;
  titulo: string;
  candidatos: Candidato[];
}

export const EstadisticasPage: React.FC = () => {
  const [elecciones, setElecciones] = useState<Eleccion[]>([]);

  useEffect(() => {
    // Función para cargar los datos de las elecciones
    const fetchElecciones = async () => {
      try {
        // Cambia esto con los IDs de tus elecciones reales
        const electionIds = [1, 2, 3]; // Ejemplo de IDs de elecciones
        const eleccionesData = await Promise.all(
          electionIds.map(async (id) => {
            const response = await axios.get(
              `http://localhost:8080/v1/results/${id}`
            );
            const candidatos = response.data.map((candidato: any) => ({
              nombre: candidato.nombre,
              resultado: candidato.resultado + "%",
              foto: candidato.foto, // Asegúrate de tener una URL válida para la foto
            }));
            return { id, titulo: `Elección ${id}`, candidatos };
          })
        );
        setElecciones(eleccionesData);
      } catch (error) {
        console.error("Error al cargar los resultados de las elecciones:", error);
      }
    };

    fetchElecciones();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#EAEAEA", pt: 8, pb: 8 }}>
      <Container maxWidth="md">
        {elecciones.map((eleccion) => (
          <Card
            key={eleccion.id}
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

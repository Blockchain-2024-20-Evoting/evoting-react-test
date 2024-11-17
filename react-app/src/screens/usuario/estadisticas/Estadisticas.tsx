import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface Candidato {
  nombre: string;
  porcentaje: number;
  foto: string;
  partido: string;
}

interface Eleccion {
  id: number;
  titulo: string;
  candidatos: Candidato[];
}

export const EstadisticasPage: React.FC = () => {
  const [elecciones, setElecciones] = useState<Eleccion[]>([]);
  const [eleccionSeleccionada, setEleccionSeleccionada] = useState<
    number | null
  >(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [resultadosListos, setResultadosListos] = useState<boolean>(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchElecciones = async () => {
      try {
        const response = await axios.get(
          "http://206.189.238.162:8080/v1/election",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const eleccionesData = response.data.map((eleccion: any) => ({
          id: eleccion.id,
          titulo: eleccion.name,
          candidatos: [],
        }));
        setElecciones(eleccionesData);
      } catch (error) {
        console.error("Error al cargar las elecciones:", error);
      }
    };
    fetchElecciones();
  }, []);

  useEffect(() => {
    if (eleccionSeleccionada !== null) {
      const fetchResultados = async () => {
        try {
          const response = await axios.get(
            `http://206.189.238.162:8080/v1/results/${eleccionSeleccionada}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Verificar que la respuesta tenga la estructura correcta
          if (response.data && Array.isArray(response.data)) {
            const candidatosData = response.data.map((resultado: any) => ({
              nombre: resultado.candidateEntity.name,
              porcentaje: resultado.percentages,
              foto: resultado.candidateEntity.photoUrl,
              partido: resultado.partyName,
            }));

            setCandidatos(candidatosData);
            setResultadosListos(candidatosData.length > 0);
          } else {
            console.error("Respuesta del servidor inesperada:", response.data);
            setResultadosListos(false); // En caso de que no haya datos esperados
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            // Accede a las propiedades específicas del error de Axios
            console.error(
              "Error al cargar los resultados:",
              error.response?.data || error.message
            );
          } else {
            console.error("Error desconocido:", error);
          }
          setResultadosListos(false); // Asume que no hay resultados en caso de error
        }
      };

      fetchResultados();
    }
  }, [eleccionSeleccionada]);

  return (
    <Box sx={{ backgroundColor: "#EAEAEA", pt: 8, pb: 8 }}>
      <Container maxWidth="md">
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="eleccion-select-label">
            Selecciona una elección
          </InputLabel>
          <Select
            labelId="eleccion-select-label"
            value={eleccionSeleccionada || ""}
            onChange={(e) => setEleccionSeleccionada(Number(e.target.value))}
          >
            {elecciones.map((eleccion) => (
              <MenuItem key={eleccion.id} value={eleccion.id}>
                {eleccion.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {eleccionSeleccionada !== null && (
          <>
            {resultadosListos ? (
              <Card
                sx={{
                  mb: 4,
                  borderRadius: 5,
                  backgroundColor: "#EAEAEA",
                  boxShadow: "none",
                }}
              >
                <CardContent
                  sx={{ backgroundColor: "#47184D", borderRadius: 5 }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    marginBottom="1.5rem"
                    color="white"
                  >
                    Resultados de la elección
                  </Typography>
                  {candidatos
                    .sort((a, b) => b.porcentaje - a.porcentaje)
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
                              {candidato.nombre} ({candidato.partido})
                            </Typography>
                          </Box>
                          <Typography variant="body1">
                            {candidato.porcentaje.toFixed(2)}%
                          </Typography>
                        </Box>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            ) : (
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
              >
                Resultados no listos aún
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

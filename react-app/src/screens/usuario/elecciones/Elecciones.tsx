import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EleccionesPage: React.FC = () => {
  const [eleccion, setEleccion] = useState<string>("");
  const [elecciones, setElecciones] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElecciones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/election");
        setElecciones(response.data);
      } catch (error) {
        console.error("Error al obtener las elecciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchElecciones();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedElectionId = event.target.value;
    setEleccion(selectedElectionId);

    const selectedElection = elecciones.find(
      (eleccion) => eleccion.id === selectedElectionId
    );

    if (selectedElection) {
      navigate(`/votaciones/${selectedElection.id}`, {
        state: {
          electionId: selectedElection.id,
          electionName: selectedElection.name,
        },
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#E7E5D9",
      }}
    >
      <Container
        sx={{ mb: { xs: 5, md: 10 }, textAlign: "center", marginTop: 10 }}
        maxWidth="xl"
      >
        <Typography
          sx={{
            fontFamily: "Lexend-mixed",
            fontSize: { xs: "32px", sm: "48px", md: "64px" },
            color: "#000000",
            mb: 4,
          }}
        >
          Escoge las elecciones en la cual deseas votar
        </Typography>
      </Container>

      {loading ? (
        <Typography>Cargando elecciones...</Typography>
      ) : (
        <FormControl
          fullWidth
          sx={{ maxWidth: "400px", mb: 10, mt: -8, backgroundColor: "#FFFFFF" }}
        >
          <InputLabel id="demo-simple-select-label">Elige Elecciones</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eleccion}
            onChange={handleChange}
            label="Elige Elecciones"
          >
            {elecciones.length > 0 ? (
              elecciones.map((eleccion) => (
                <MenuItem key={eleccion.id} value={eleccion.id}>
                  {eleccion.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No hay elecciones disponibles</MenuItem>
            )}
          </Select>
        </FormControl>
      )}

      <Box
        component="img"
        src="/src/assets/imgElecciones.svg"
        alt="Imagen de Elecciones"
        sx={{
          width: "100%",
          maxWidth: "150rem",
          mt: { xs: 3, md: 5 },
          flexGrow: 1,
        }}
      />
    </Box>
  );
};

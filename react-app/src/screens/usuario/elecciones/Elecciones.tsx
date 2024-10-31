import React, { useState } from "react";
import Card, { CardBody } from "../../../components/Card";
import {
  Autocomplete,
  Box,
  Container,
  MenuItem,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const elecciones = ["Elección 1", "Elección 2"];

export const EleccionesPage: React.FC = () => {
  const [eleccion, setEleccion] = useState<string>(""); // Estado para manejar la elección seleccionada

  const handleChange = (event: SelectChangeEvent) => {
    setEleccion(event.target.value as string); // Actualiza el estado con la elección seleccionada
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Asegura que la caja ocupe toda la altura de la página
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
            fontSize: { xs: "32px", sm: "48px", md: "64px" }, // tamaño responsivo del texto
            color: "#000000",
            mb: 4, // Añadir margen inferior para espaciar del siguiente elemento
          }}
        >
          Escoge las elecciones en la cuál deseas votar
        </Typography>
      </Container>
      <FormControl
        fullWidth
        sx={{ maxWidth: "400px", mb: 10, mt: -8, backgroundColor: "#FFFFFF" }}
      >
        {" "}
        {/* Reduce el ancho del FormControl */}
        <InputLabel id="demo-simple-select-label">Elige Elecciones</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={eleccion}
          onChange={handleChange}
        >
          {elecciones.map((eleccion) => (
            <MenuItem key={eleccion} value={eleccion}>
              {eleccion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        component="img"
        src="/src/assets/imgElecciones.svg"
        alt="Imagen de Elecciones"
        sx={{
          width: "100%", // Asegura que la imagen sea responsiva
          maxWidth: "150rem", // Mantiene un ancho máximo para la imagen
          mt: { xs: 3, md: 5 },
          flexGrow: 1, // Permite que la imagen ocupe el espacio restante en la columna
        }}
      />
    </Box>
  );
};

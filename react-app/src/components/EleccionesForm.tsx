import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Warning, CheckCircle } from "@mui/icons-material"; // Importar íconos
import axios from "axios";

const EleccionesForm: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const state = "PENDING"; // Asumimos que el estado inicial es PENDING

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    const electionData = {
      name: nombre,
      startDate: fechaInicio,
      endDate: fechaFin,
      state, // Añadido el estado predeterminado
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/election",
        electionData
      );
      console.log("Elección guardada:", response.data);
      setSuccess(true); // Mostrar el modal de éxito
    } catch (err: any) {
      if (err.response) {
        // Manejo de error en la respuesta
        if (err.response.status === 409) {
          // Asumimos que 409 es el código de conflicto
          setError("El nombre de la elección ya existe en la base de datos.");
        } else {
          setError(err.response.data.message || "Error al crear la elección.");
        }
      } else {
        // Error de red
        setError("Error de red. Inténtalo de nuevo.");
      }
      console.error("Error al crear la elección:", err);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false); // Cerrar el modal de éxito
    // También puedes reiniciar los campos del formulario aquí si es necesario
    setNombre("");
    setFechaInicio("");
    setFechaFin("");
    setError(null);
  };

  const handleCloseError = () => {
    setError(null); // Cerrar el modal de error
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #290E55, #7E4DCF)",
        borderRadius: "20px",
        padding: 5,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        textAlign: "center",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: visible ? 1 : 0,
      }}
      component="form"
      onSubmit={handleGuardar}
    >
      <Box
        sx={{
          background: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Nuevas elecciones
        </Typography>
        <TextField
          label="Nombre elecciones"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Fecha inicio"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 4 }}
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <TextField
          label="Fecha fin"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 4 }}
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: "center",
            padding: "8px 32px",
            backgroundColor: "#6A1B9A",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#4A148C",
            },
          }}
        >
          Guardar
        </Button>
      </Box>

      {/* Modal de éxito */}
      <Dialog open={success} onClose={handleCloseSuccess}>
        <DialogTitle>
          <CheckCircle sx={{ color: "green", mr: 1 }} /> Éxito
        </DialogTitle>
        <DialogContent>
          <Typography>La elección ha sido guardada exitosamente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de advertencia */}
      <Dialog open={!!error} onClose={handleCloseError}>
        <DialogTitle>
          <Warning sx={{ color: "orange", mr: 1 }} /> Error
        </DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EleccionesForm;

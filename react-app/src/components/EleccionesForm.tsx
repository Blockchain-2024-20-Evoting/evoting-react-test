// src/components/EleccionesForm.tsx
import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const EleccionesForm: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #290E55, #7E4DCF)',
        borderRadius: "20px",
        padding: 5,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Nuevas elecciones</Typography>
      <TextField label="Nombre elecciones" variant="outlined" fullWidth />
      <TextField label="Fecha inicio" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
      <TextField label="Fecha fin" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
      <Button
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
  );
};

export default EleccionesForm;

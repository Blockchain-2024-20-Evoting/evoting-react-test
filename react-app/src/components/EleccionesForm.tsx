// src/components/EleccionesForm.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const EleccionesForm: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #290E55, #7E4DCF)', // Degradado de fondo
        padding: 4,
        borderRadius: 10,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: 'calc(100% - 20px)', // Ancho total menos 20px de margen
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        opacity: visible ? 1 : 0,
      }}
    >
      <Box
        sx={{
          background: 'white',
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
    </Box>
  );
};

export default EleccionesForm;

// src/components/NewUserForm.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const NewUserForm: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hacer que el formulario sea visible después de que se monte el componente
    setVisible(true);
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #290E55, #7E4DCF)', // Degradado de fondo
        borderRadius: 10,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        padding: 4,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <Box
        sx={{
          background: '#fff',
          borderRadius: 2,
          padding: 4,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.1)', // Borde sutil
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#47184D' }}>
          Usuario Nuevo
        </Typography>
        <TextField
          label="Nombre/s"
          fullWidth
          margin="normal"
          variant="outlined" // Cambia el estilo del TextField a outlined
          sx={{
            borderColor: 'rgba(0, 0, 0, 0.1)', // Borde sutil
          }}
        />
        <TextField
          label="Apellido/s"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#F8F8F8', // Fondo blanco para el botón
              textTransform: 'lowercase', // Texto en minúsculas
              color: '#000000', // Texto en negro
            }}
          >
            guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewUserForm;

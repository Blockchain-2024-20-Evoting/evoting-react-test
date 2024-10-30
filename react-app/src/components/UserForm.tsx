// src/components/NewUserForm.tsx
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const NewUserForm: React.FC = () => {
  return (
    <Box
      sx={{
        background: '#fff',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%', // Esto hace que el formulario ocupe el ancho disponible
        maxWidth: '800px', // Limita el ancho máximo del formulario para que no sea demasiado amplio
        margin: '0 auto', // Centra el formulario horizontalmente
      }}
    >
      <Typography variant="h5" gutterBottom color="primary">
        Usuario Nuevo
      </Typography>
      <TextField label="Nombre/s" fullWidth margin="normal" />
      <TextField label="Apellido/s" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" fullWidth margin="normal" />
      <Box textAlign="center" mt={2}>
        <Button variant="contained" color="primary">
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default NewUserForm;
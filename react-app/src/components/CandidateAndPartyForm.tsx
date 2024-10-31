// src/components/CandidateAndPartyForm.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const CandidateAndPartyForm: React.FC = () => {
  const [election, setElection] = React.useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hacer que el formulario sea visible después de que se monte el componente
    setVisible(true);
  }, []);

  const handleElectionChange = (event: SelectChangeEvent) => {
    setElection(event.target.value as string);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #290E55, #7E4DCF)', // Degradado de fondo
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: 'calc(100% - 20px)', // Ancho total menos 20px de margen
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {/* Caja interna para el contenido */}
      <Box
        sx={{
          background: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
        }}
      >
        {/* Datos del Candidato */}
        <Grid container spacing={2} sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1, padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="#47184D" textAlign="center"> {/* Color cambiado */}
              Datos candidato
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  borderRadius: '12px', // Esquinas redondeadas
                  background: 'linear-gradient(to bottom, #290E55, #7E4DCF)', // Degradado
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Sombreado
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', // Sombreado más intenso al pasar el mouse
                  },
                }}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera sx={{ fontSize: 80, color: '#fff' }} />
              </IconButton>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  marginTop: 1,
                  border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Sombreado
                  color: 'black', // Color del texto en negro
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', // Sombreado más intenso al pasar el mouse
                  },
                }}
              >
                subir imagen
                <input hidden accept="image/*" type="file" />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Nombres"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                  borderRadius: '4px', // Esquinas redondeadas
                },
              }}
            />
            <TextField
              label="Apellidos"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                  borderRadius: '4px', // Esquinas redondeadas
                },
              }}
            />
            <Box mt={2}>
              <InputLabel id="election-label">Elecciones</InputLabel>
              <Select
                labelId="election-label"
                value={election}
                onChange={handleElectionChange}
                fullWidth
                sx={{
                  '& .MuiSelect-select': {
                    border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                    borderRadius: '4px', // Esquinas redondeadas
                  },
                }}
              >
                <MenuItem value="">
                  <em>Seleccione una opción</em>
                </MenuItem>
                <MenuItem value="eleccion1">Elección 1</MenuItem>
                <MenuItem value="eleccion2">Elección 2</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>

        {/* Datos del Partido */}
        <Grid container spacing={2} sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1, padding: 2, mt: 4 }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="#47184D" textAlign="center"> {/* Color cambiado */}
              Datos Partido
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  borderRadius: '12px', // Esquinas redondeadas
                  background: 'linear-gradient(to bottom, #290E55, #7E4DCF)', // Degradado
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Sombreado
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', // Sombreado más intenso al pasar el mouse
                  },
                }}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera sx={{ fontSize: 80, color: '#fff' }} />
              </IconButton>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  marginTop: 1,
                  border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Sombreado
                  color: 'black', // Color del texto en negro
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', // Sombreado más intenso al pasar el mouse
                  },
                }}
              >
                subir imagen
                <input hidden accept="image/*" type="file" />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Nombre partido"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                  borderRadius: '4px', // Esquinas redondeadas
                },
              }}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              InputProps={{
                sx: {
                  border: '1px solid rgba(0, 0, 0, 0.12)', // Borde sutil
                  borderRadius: '4px', // Esquinas redondeadas
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Botón Guardar */}
        <Box textAlign="center" mt={4}>
          <Button variant="contained" sx={{ backgroundColor: '#F8F8F8', color: 'black', textTransform: 'lowercase' }}> {/* Fondo blanco y texto en minúsculas */}
            guardar candidato
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateAndPartyForm;

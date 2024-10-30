// src/components/CandidateAndPartyForm.tsx
import React from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const CandidateAndPartyForm: React.FC = () => {
  const [election, setElection] = React.useState('');

  const handleElectionChange = (event: SelectChangeEvent) => {
    setElection(event.target.value as string);
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Datos del Candidato */}
      <Typography variant="h5" gutterBottom color="primary">
        Datos candidato
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera sx={{ fontSize: 80, color: '#6A1B9A' }} />
            </IconButton>
            <Button variant="outlined" component="label">
              subir imagen
              <input hidden accept="image/*" type="file" />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField label="Nombres" fullWidth margin="normal" />
          <TextField label="Apellidos" fullWidth margin="normal" />
          <Box mt={2}> {/* Ajusta el espaciado aquí en lugar de usar margin en Select */}
            <InputLabel id="election-label">Elecciones</InputLabel>
            <Select
              labelId="election-label"
              value={election}
              onChange={handleElectionChange}
              fullWidth
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
      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
        Datos Partido
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera sx={{ fontSize: 80, color: '#6A1B9A' }} />
            </IconButton>
            <Button variant="outlined" component="label">
              subir imagen
              <input hidden accept="image/*" type="file" />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField label="Nombre partido" fullWidth margin="normal" />
          <TextField label="Descripción" fullWidth multiline rows={4} margin="normal" />
        </Grid>
      </Grid>

      {/* Botón Guardar */}
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary">
          guardar candidato
        </Button>
      </Box>
    </Box>
  );
};

export default CandidateAndPartyForm;
// src/screens/dashboard/Dashboard.tsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Configuración
        </Typography>
        {/* Área donde se cargan los componentes según la ruta interna */}
        <Outlet />
      </Container>
    </Box>
  );
};

export default Dashboard;
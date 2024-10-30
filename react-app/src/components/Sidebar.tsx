// src/components/Sidebar.tsx
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to bottom, #47184D, #915399)',
        padding: 0,
        borderRadius: '0 20px 20px 0', // Esquinas redondeadas solo en el lado derecho del Sidebar
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
        <ListItem
          component={Link}
          to="/dashboard/usuarios"
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0 12px 12px 0', // Menos redondeo en las esquinas derechas
            marginBottom: 2,
            marginRight: 2, // Espacio a la derecha del botón
            color: '#000000', // Color de texto negro
            '&:hover': {
              backgroundColor: '#f3f3f3',
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: '#47184D' }} />
          </ListItemIcon>
          <ListItemText primary="Usuarios" sx={{ color: '#000000' }} />
        </ListItem>

        <ListItem
          component={Link}
          to="/dashboard/candidatos"
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0 12px 12px 0', // Menos redondeo en las esquinas derechas
            marginBottom: 2,
            marginRight: 2, // Espacio a la derecha del botón
            color: '#000000', // Color de texto negro
            '&:hover': {
              backgroundColor: '#f3f3f3',
            },
          }}
        >
          <ListItemIcon>
            <HowToVoteIcon sx={{ color: '#47184D' }} />
          </ListItemIcon>
          <ListItemText primary="Candidatos y Partidos" sx={{ color: '#000000' }} />
        </ListItem>

        <ListItem
          component={Link}
          to="/elecciones"
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0 12px 12px 0', // Menos redondeo en las esquinas derechas
            marginBottom: 2,
            marginRight: 2, // Espacio a la derecha del botón
            color: '#000000', // Color de texto negro
            '&:hover': {
              backgroundColor: '#f3f3f3',
            },
          }}
        >
          <ListItemIcon>
            <BarChartIcon sx={{ color: '#47184D' }} />
          </ListItemIcon>
          <ListItemText primary="Elecciones" sx={{ color: '#000000' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
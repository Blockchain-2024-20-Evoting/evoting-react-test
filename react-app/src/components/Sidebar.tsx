// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (section: string) => {
    setSelected(section);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to bottom, #47184D, #915399)',
        paddingRight: '10px', // Ajuste de separación
        borderRadius: '0 20px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <List>
        <ListItem
          component={Link}
          to="/dashboard/usuarios"
          onClick={() => handleClick("usuarios")}
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0 12px 12px 0',
            marginBottom: 2,
            color: '#000000',
            transition: 'box-shadow 0.2s ease, width 0.3s ease',
            width: selected === "usuarios" ? 'calc(100% + 10px)' : '100%', // Alargar botón sin separarlo del borde
            boxShadow: selected === "usuarios" ? 'inset 4px 4px 10px rgba(0, 0, 0, 0.5)' : 'none',
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
          onClick={() => handleClick("candidatos")}
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0 12px 12px 0',
            marginBottom: 2,
            color: '#000000',
            transition: 'box-shadow 0.2s ease, width 0.3s ease',
            width: selected === "candidatos" ? 'calc(100% + 10px)' : '100%', // Alargar botón sin separarlo del borde
            boxShadow: selected === "candidatos" ? 'inset 4px 4px 10px rgba(0, 0, 0, 0.5)' : 'none',
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
          to="/dashboard/elecciones" // Ruta para el componente de elecciones
          onClick={() => handleClick("elecciones")}
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0 12px 12px 0',
            marginBottom: 2,
            color: '#000000',
            transition: 'box-shadow 0.2s ease, width 0.3s ease',
            width: selected === "elecciones" ? 'calc(100% + 10px)' : '100%', // Alargar botón sin separarlo del borde
            boxShadow: selected === "elecciones" ? 'inset 4px 4px 10px rgba(0, 0, 0, 0.5)' : 'none',
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

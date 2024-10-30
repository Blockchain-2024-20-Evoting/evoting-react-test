// src/screens/user/UserPage.tsx
import React from 'react';
import { Container, Box } from '@mui/material';
import UserForm from '../../components/UserForm';

const UserPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <UserForm />
      </Box>
    </Container>
  );
};

export default UserPage;
// src/screens/loginpage/LoginPage.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <Box style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box
        style={{
          width: "50%",
          backgroundImage: 'url("/public/imagenLogin.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      />
      <Box
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bienvenidos
        </Typography>
        <Typography variant="h6" gutterBottom>
          Iniciar sesión
        </Typography>
        <TextField
          label="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleLogin}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;

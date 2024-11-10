import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      // Manejar la respuesta del servidor
      if (response.data.token) {
        // Guarda el studentId en el localStorage
        const studentId = response.data.studentId;
        localStorage.setItem("studentId", studentId); // Asegúrate de que el servidor esté enviando el studentId en la respuesta
        console.log("studentId:", studentId);

        // Llama al login del contexto con el rol recibido
        await login(email, password, response.data.role); // Aquí pasamos el rol al contexto

        // Redirigir según el rol del usuario
        if (response.data.role === "ADMIN") {
          navigate("/dashboard");
        } else if (response.data.role === "STUDENT") {
          navigate("/home");
        }
      } else {
        setError("Email o contraseña incorrecta");
      }
    } catch (err: any) {
      if (err.response) {
        const message =
          err.response.data.message ||
          "Ha ocurrido un error en el inicio de sesión.";
        setError(message);
      } else {
        setError("Ha ocurrido un error de red.");
      }
      console.error(err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin(e as unknown as React.FormEvent);
    }
  };

  return (
    <Box style={{ display: "flex", height: "100vh", width: "100vw" }}>
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
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress} // Agregar el manejador de la tecla
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Agregar el manejador de la tecla
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

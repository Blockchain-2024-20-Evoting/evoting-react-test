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
      const response = await axios.post(
        "http://206.189.238.162:8080/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        // Guardar token y studentId en localStorage
        const { token, studentId, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("studentId", studentId);

        // Llama al método login del contexto
        await login(email, password, role);

        // Redirigir según el rol
        if (role === "ADMIN") {
          navigate("/dashboard");
        } else if (role === "STUDENT") {
          navigate("/home");
        }
      } else {
        setError("Email o contraseña incorrecta");
      }
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response.data.message || "Ha ocurrido un error en el inicio de sesión."
        );
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
          height: "100vh",
        }}
      >
        <img
          src="/imagenLogin.svg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
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
          onKeyPress={handleKeyPress}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
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

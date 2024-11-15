// src/components/NewUserForm.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const NewUserForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Hacer que el formulario sea visible después de que se monte el componente
    setVisible(true);
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      // Hacer la solicitud POST al backend
      const response = await axios.post(
        "http://206.189.238.162:8080/auth/register/student",
        newUser
      ); // Cambiado a la ruta correcta

      if (response.status === 201) {
        // Limpiar campos y mensaje de éxito
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setErrorMessage(null);
        alert("Usuario creado exitosamente");
      }
    } catch (error) {
      // Manejo de errores de la solicitud
      setErrorMessage(
        "Error al crear el usuario. Por favor revisa los datos ingresados."
      );
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #290E55, #7E4DCF)", // Degradado de fondo
        borderRadius: 10,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        padding: 4,
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          padding: 4,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)", // Borde sutil
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#47184D" }}>
          Usuario Nuevo
        </Typography>
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <TextField
          label="Nombre/s"
          fullWidth
          margin="normal"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{
            borderColor: "rgba(0, 0, 0, 0.1)", // Borde sutil
          }}
        />
        <TextField
          label="Apellido/s"
          fullWidth
          margin="normal"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#F8F8F8", // Fondo blanco para el botón
              textTransform: "lowercase", // Texto en minúsculas
              color: "#000000", // Texto en negro
            }}
            onClick={handleSubmit}
          >
            guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewUserForm;

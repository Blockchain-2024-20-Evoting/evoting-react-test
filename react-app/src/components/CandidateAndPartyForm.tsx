import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  keyframes,
} from "@mui/material";
import { Warning, CheckCircle, PhotoCamera } from "@mui/icons-material";
import axios from "axios";

// Animación para la vista
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CandidateAndPartyForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [candidateImage, setCandidateImage] = useState<File | null>(null);
  const [partyName, setPartyName] = useState<string>("");
  const [partyDescription, setPartyDescription] = useState<string>("");
  const [partyImage, setPartyImage] = useState<File | null>(null);
  const [election, setElection] = useState<string>("");
  const [elections, setElections] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/election");
        setElections(response.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
        setError("Error al cargar las elecciones.");
      }
    };
    fetchElections();
  }, []);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Verificar campos obligatorios
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !election ||
      !partyName.trim() ||
      !partyDescription.trim()
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Verificar si las imágenes están seleccionadas
    if (!candidateImage) {
      setError("Por favor, seleccione una imagen para el candidato.");
      return;
    }

    if (!partyImage) {
      setError("Por favor, seleccione una imagen para el partido.");
      return;
    }

    const candidateFormData = new FormData();
    candidateFormData.append("firstName", firstName.trim());
    candidateFormData.append("lastName", lastName.trim());
    candidateFormData.append("electionId", election);
    candidateFormData.append("img", candidateImage);

    const partyFormData = new FormData();
    partyFormData.append("name", partyName.trim());
    partyFormData.append("description", partyDescription.trim());
    partyFormData.append("img", partyImage);

    try {
      // Crear el partido
      const partyResponse = await axios.post("http://localhost:8080/v1/party", partyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Partido creado:", partyResponse.data.id);

      // Agregar el ID del partido al candidato
      candidateFormData.append("partyId", partyResponse.data.id);

      // Crear el candidato
      const candidateResponse = await axios.post("http://localhost:8080/v1/candidate", candidateFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Candidato creado:", candidateResponse.data);

      // Resetear los campos del formulario
      setFirstName("");
      setLastName("");
      setCandidateImage(null);
      setPartyName("");
      setPartyDescription("");
      setPartyImage(null);
      setElection("");
      setError("");
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error);
        setError(`Error al crear candidato o partido: ${error.response?.data?.message || "Error desconocido"}`);
      } else {
        console.error("Error:", error);
        setError("Error desconocido al crear candidato o partido.");
      }
    }
  };

  const handleCloseSuccess = () => setSuccess(false);
  const handleCloseError = () => setError(null);

  const renderImageBox = (image: File | null, setImage: React.Dispatch<React.SetStateAction<File | null>>) => (
    <Box
      sx={{
        width: 120,
        height: 120,
        border: "2px dashed #ccc",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: "pointer",
        background: image ? `url(${URL.createObjectURL(image)})` : "#f5f5f5",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!image && <PhotoCamera sx={{ color: "#aaa", fontSize: 32 }} />}
      <input
        type="file"
        accept="image/*"
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.files) setImage(target.files[0]);
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        animation: `${fadeInUp} 0.6s ease-out`,
        background: "linear-gradient(to bottom, #290E55, #7E4DCF)",
        borderRadius: "20px",
        padding: 5,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        textAlign: "center",
      }}
      component="form"
      onSubmit={handleCreate}
    >
      <Typography variant="h4" sx={{ color: "#fff" }}>
        Crear Candidato y Partido
      </Typography>

      {/* Candidato */}
      <Box
        sx={{
          background: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>{renderImageBox(candidateImage, setCandidateImage)}</Grid>
          <Grid item xs>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Información del Candidato
            </Typography>
            <TextField
              label="Nombre del candidato"
              fullWidth
              sx={{ mb: 2 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Apellido del candidato"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            {/* Selección de Elección */}
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel id="election-label">Elección</InputLabel>
              <Select
                labelId="election-label"
                value={election}
                onChange={(e) => setElection(e.target.value)}
                label="Elección"
              >
                {elections.map((election) => (
                  <MenuItem key={election.id} value={election.id}>
                    {election.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Partido */}
      <Box
        sx={{
          background: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>{renderImageBox(partyImage, setPartyImage)}</Grid>
          <Grid item xs>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Información del Partido
            </Typography>
            <TextField
              label="Nombre del partido"
              fullWidth
              sx={{ mb: 2 }}
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
            />
            <TextField
              label="Descripción del partido"
              fullWidth
              value={partyDescription}
              onChange={(e) => setPartyDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: "#fff",
          color: "#290E55",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        size="large"
      >
        Crear
      </Button>

      {/* Mensajes de Error o Éxito */}
      {error && (
        <Dialog open={Boolean(error)} onClose={handleCloseError}>
          <DialogTitle>¡Ups!</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Warning sx={{ color: "#f44336", mr: 1 }} />
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {success && (
        <Dialog open={success} onClose={handleCloseSuccess}>
          <DialogTitle>¡Éxito!</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircle sx={{ color: "#4caf50", mr: 1 }} />
              <Typography variant="body1">
                Candidato y partido creados con éxito.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccess} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CandidateAndPartyForm;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  Avatar,
  Checkbox,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  electionId: number;
  partyName: string;
  logo: string;
  photo: string;
}

export const VotacionesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { electionId, electionName } = location.state || {};
  const [candidatos, setCandidatos] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [votoRegistrado, setVotoRegistrado] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const token = localStorage.getItem("authToken");


  useEffect(() => {
    const fetchCandidatos = async () => {
      if (electionId) {
        try {
          const response = await axios.get(
            `http://206.189.238.162:8080/v1/candidate/elections/${electionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCandidatos(response.data);
        } catch (error) {
          console.error("Error fetching candidates:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No electionId provided.");
        navigate("/elecciones"); // Redirige si no se recibe el ID de la elección
      }
    };

    fetchCandidatos();
  }, [electionId, navigate]);

  const handleCheckboxChange = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleVote = () => {
    if (selectedIndex !== null) {
      setOpenModal(true);
    }
  };

  const confirmVote = async () => {
    const studentId = localStorage.getItem("studentId"); // Asegúrate de que el ID está en localStorage
    console.log("studentId:", studentId);
    if (!studentId) {
      console.error("Estudiante no autenticado");
      navigate("/login"); // Redirige al login si no está autenticado
      return;
    }

    // Convierte el ID a número si es necesario
    const studentIdNumber = Number(studentId);

    if (isNaN(studentIdNumber)) {
      console.error("El studentId no es un número válido");
      return;
    }

    const candidateId = candidatos[selectedIndex!].id;
    try {
      await axios.post(
        "http://206.189.238.162:8080/vote", 
        {
        studentId: studentIdNumber, // Enviando el ID como número
        candidateId: candidateId,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setVotoRegistrado(true);
      setOpenModal(false);
    } catch (error) {
      console.error("Error al registrar el voto:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#EAEAEA", minHeight: "100vh", py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", mb: 3, ml: 8 }}
      >
        {electionName
          ? `Candidatos para la Elección: ${electionName}`
          : "Candidatos"}
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "50vh" }}
        >
          <CircularProgress />
        </Box>
      ) : candidatos.length === 0 ? (
        <Typography align="center" sx={{ mt: 5 }}>
          No hay candidatos disponibles para esta elección.
        </Typography>
      ) : (
        <Container
          sx={{
            mt: 5,
            backgroundColor: "#47184D",
            pt: 3,
            pb: 3,
            borderRadius: 5,
            maxWidth: "xl",
          }}
        >
          {candidatos.map((candidato, index) => (
            <Card
              key={candidato.id}
              sx={{
                mb: 2,
                boxShadow: 3,
                py: 0,
                backgroundColor: "#EAEAEA",
                borderRadius: 2,
              }}
            >
              <Container sx={{ display: "flex", flexDirection: "column" }}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    mr: -3,
                    ml: -3,
                  }}
                >
                  <Avatar
                    src={candidato.logo}
                    alt={`${candidato.partyName} logo`}
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      mt: 1,
                      ml: 1,
                      mb: 1,
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {candidato.partyName}
                  </Typography>
                </Card>

                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mr: -3,
                    ml: -3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={candidato.photo}
                      alt={`${candidato.firstName} ${candidato.lastName}`}
                      sx={{
                        width: 40,
                        height: 40,
                        mr: 2,
                        mt: 1,
                        ml: 1,
                        mb: 1,
                      }}
                    />
                    <Typography>{`${candidato.firstName} ${candidato.lastName}`}</Typography>
                  </Box>
                  <Checkbox
                    edge="end"
                    checked={selectedIndex === index}
                    onChange={() => handleCheckboxChange(index)}
                    disabled={votoRegistrado}
                    sx={{ ml: 2, mr: 2 }}
                  />
                </Card>
              </Container>
            </Card>
          ))}

          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              onClick={handleVote}
              sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            >
              Guardar Voto
            </Button>
          </Box>
        </Container>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2 }}>
          <Typography variant="h6" align="center">
            ¿Estás seguro de que deseas emitir tu voto? Este paso no puede ser
            revertido.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
            <Button onClick={confirmVote} variant="contained">
              Confirmar
            </Button>
            <Button onClick={() => setOpenModal(false)} variant="outlined">
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

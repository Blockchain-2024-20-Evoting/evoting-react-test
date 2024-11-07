import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Card, Avatar, Checkbox, Button, Modal, Box as ModalBox, CircularProgress } from "@mui/material";
import axios from "axios";

interface ElectionDTO {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface CandidateResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  partyName: string;
  electionName: string;
}

export const VotacionesPage: React.FC = () => {
  const [elecciones, setElecciones] = useState<ElectionDTO[]>([]); // Lista de elecciones
  const [selectedElection, setSelectedElection] = useState<ElectionDTO | null>(null); // Elección seleccionada
  const [candidatos, setCandidatos] = useState<CandidateResponseDTO[]>([]); // Candidatos de la elección seleccionada
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Candidato seleccionado
  const [votoRegistrado, setVotoRegistrado] = useState<boolean>(false); // Si ya se votó
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal de confirmación
  const [loading, setLoading] = useState<boolean>(true); // Indicador de carga

  // Función para obtener las elecciones disponibles
  const fetchElecciones = async () => {
    try {
      const response = await axios.get("http://localhost:8080/v1/election");
      const today = new Date();
      const activeElecciones = response.data.filter((eleccion: ElectionDTO) => 
        today >= new Date(eleccion.startDate) && today <= new Date(eleccion.endDate)
      );
      setElecciones(activeElecciones);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las elecciones", error);
      setLoading(false);
    }
  };

  // Función para obtener los candidatos de una elección
  const fetchCandidatos = async (electionId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/v1/candidate?electionId=${electionId}`);
      setCandidatos(response.data);
    } catch (error) {
      console.error("Error al obtener los candidatos", error);
    }
  };

  useEffect(() => {
    fetchElecciones(); // Cargar elecciones al inicio
  }, []);

  // Función para manejar la selección de una elección
  const handleElectionSelect = (eleccion: ElectionDTO) => {
    setSelectedElection(eleccion);
    fetchCandidatos(eleccion.id); // Obtener los candidatos de la elección seleccionada
  };

  // Función para manejar el cambio de selección de candidato
  const handleCheckboxChange = (index: number) => {
    if (!votoRegistrado) {
      setSelectedIndex(index === selectedIndex ? null : index);
    }
  };

  // Función para manejar el voto
  const handleVote = () => {
    if (selectedIndex !== null) {
      setOpenModal(true); // Mostrar el modal de confirmación
    }
  };

  // Confirmar el voto
  const confirmVote = async () => {
    const studentId = localStorage.getItem('studentId'); // Recuperar el studentId desde localStorage
    if (!studentId) {
      console.error("Estudiante no autenticado");
      return;
    }

    const candidateId = candidatos[selectedIndex!].id; // Obtener el ID del candidato seleccionado

    try {
      await axios.post("http://localhost:8080/vote", { studentId: parseInt(studentId), candidateId }); // Registrar el voto
      setVotoRegistrado(true); // Marcar como votado
      setOpenModal(false); // Cerrar modal
    } catch (error) {
      console.error("Error al registrar el voto:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#EAEAEA", minHeight: "100vh", py: 5 }}>
      <Typography variant="h4" align="left" sx={{ fontWeight: "bold", mb: 1, ml: 8 }}>
        Votaciones
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ backgroundColor: "#47184D", pt: 3, pb: 3, borderRadius: 5, maxWidth: "xl" }}>
          {/* Paso 1: Mostrar elecciones */}
          {selectedElection === null ? (
            <>
              <Typography sx={{ fontSize: 24, color: "#FFFFFF", mb: 3 }}>
                Selecciona una Elección
              </Typography>
              {elecciones.map((eleccion) => (
                <Card key={eleccion.id} sx={{ mb: 2, backgroundColor: "#EAEAEA", borderRadius: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ padding: 2 }}>{eleccion.name}</Typography>
                    <Button variant="contained" onClick={() => handleElectionSelect(eleccion)}>
                      Seleccionar
                    </Button>
                  </Box>
                </Card>
              ))}
            </>
          ) : (
            <>
              {/* Paso 2: Mostrar candidatos de la elección seleccionada */}
              <Typography sx={{ fontSize: 24, color: "#FFFFFF", mb: 3 }}>
                Candidatos para {selectedElection.name}
              </Typography>
              {candidatos.map((candidato, index) => (
                <Card key={index} sx={{ mb: 2, boxShadow: 3, py: 0, backgroundColor: "#EAEAEA", borderRadius: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src={candidato.image} alt={candidato.firstName} sx={{ width: 40, height: 40, mr: 2 }} />
                      <Typography>{candidato.firstName} {candidato.lastName}</Typography>
                    </Box>
                    <Checkbox
                      checked={selectedIndex === index}
                      onChange={() => handleCheckboxChange(index)}
                      disabled={votoRegistrado} // Deshabilitar si ya se votó
                      sx={{ ml: 2 }}
                    />
                  </Box>
                </Card>
              ))}

              <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" onClick={handleVote} sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}>
                  Guardar Voto
                </Button>
              </Box>
            </>
          )}
        </Container>
      )}

      {/* Modal de confirmación */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalBox sx={{ bgcolor: "white", p: 4, borderRadius: 2 }}>
          <Typography variant="h6" align="center">
            ¿Estás seguro de que deseas emitir tu voto? Este paso no puede ser revertido.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
            <Button onClick={confirmVote} variant="contained">Confirmar</Button>
            <Button onClick={() => setOpenModal(false)} variant="outlined">Cancelar</Button>
          </Box>
        </ModalBox>
      </Modal>
    </Box>
  );
};

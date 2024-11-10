import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateAndPartyForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [candidateImage, setCandidateImage] = useState<File | null>(null);
  const [partyName, setPartyName] = useState<string>('');
  const [partyDescription, setPartyDescription] = useState<string>('');
  const [partyImage, setPartyImage] = useState<File | null>(null);
  const [election, setElection] = useState<string>('');
  const [elections, setElections] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/election');
        setElections(response.data);
      } catch (error) {
        console.error('Error fetching elections:', error);
        setError('Error al cargar las elecciones.');
      }
    };
    fetchElections();
  }, []);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    // Verificación de campos obligatorios
    if (!firstName || !lastName || !election || !partyName || !partyDescription) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Comprobar si las imágenes están seleccionadas
    if (!candidateImage) {
      setError('Por favor, seleccione una imagen para el candidato.');
      return;
    }

    if (!partyImage) {
      setError('Por favor, seleccione una imagen para el partido.');
      return;
    }

    const candidateFormData = new FormData();
    candidateFormData.append('firstName', firstName);
    candidateFormData.append('lastName', lastName);
    candidateFormData.append('electionId', election);
    candidateFormData.append('img', candidateImage);

    const partyFormData = new FormData();
    partyFormData.append('name', partyName);
    partyFormData.append('description', partyDescription);
    partyFormData.append('img', partyImage);

    try {
      // Envío de los datos del partido
      const partyResponse = await axios.post('http://localhost:8080/v1/party', partyFormData, {  
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Partido creado:", partyResponse.data.id);
      
      candidateFormData.append('partyId', partyResponse.data.id);

      // Envío de los datos del candidato
      const candidateResponse = await axios.post('http://localhost:8080/v1/candidate', candidateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Candidato creado:", candidateResponse.data);

      // Resetear campos después de crear
      setFirstName('');
      setLastName('');
      setPartyName('');
      setPartyDescription('');
      setElection('');
      setCandidateImage(null);
      setPartyImage(null);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error);
        setError(`Error al crear candidato o partido: ${error.response?.data?.message || 'Error desconocido'}`);
      } else {
        console.error('Error:', error);
        setError('Error desconocido al crear candidato o partido.');
      }
    }
  };

  return (
    <form
      className="candidate-party-form"
      onSubmit={handleCreate}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 className="form-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Crear Candidato</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="firstName">Nombre del candidato</label>
        <input
          type="text"
          id="firstName"
          placeholder="Nombre del candidato"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="lastName">Apellido del candidato</label>
        <input
          type="text"
          id="lastName"
          placeholder="Apellido del candidato"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="candidateImage">Imagen del candidato</label>
        <input
          type="file"
          id="candidateImage"
          accept="image/*"
          onChange={(e) => e.target.files && setCandidateImage(e.target.files[0])}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="election">Elección</label>
        <select
          id="election"
          value={election}
          onChange={(e) => setElection(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="">Selecciona una elección</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>
              {election.name}
            </option>
          ))}
        </select>
      </div>

      <h2 className="form-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Crear Partido</h2>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="partyName">Nombre del partido</label>
        <input
          type="text"
          id="partyName"
          placeholder="Nombre del partido"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="partyDescription">Descripción del partido</label>
        <input
          type="text"
          id="partyDescription"
          placeholder="Descripción del partido"
          value={partyDescription}
          onChange={(e) => setPartyDescription(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="partyImage">Imagen del partido</label>
        <input
          type="file"
          id="partyImage"
          accept="image/*"
          onChange={(e) => e.target.files && setPartyImage(e.target.files[0])}
          required
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Crear Candidato y Partido
      </button>
    </form>
  );
};

export default CandidateAndPartyForm;

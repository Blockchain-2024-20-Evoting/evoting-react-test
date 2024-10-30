import React from "react";
import Card, { CardBody } from "../../components/Card";
import { Container } from "@mui/material";

export const EstadisticasPage: React.FC<{}> = () => {
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Card>
        <CardBody title="Estadisticas" text="HOLA MUNDO" />
      </Card>
    </Container>
  );
};

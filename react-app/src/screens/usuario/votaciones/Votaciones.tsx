import React from "react";
import Card, { CardBody } from "../../../components/Card";
import { Container } from "@mui/material";

export const VotacionesPage: React.FC<{}> = () => {
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Card>
        <CardBody title="Votaciones" text="HOLA MUNDO" />
      </Card>
    </Container>
  );
};

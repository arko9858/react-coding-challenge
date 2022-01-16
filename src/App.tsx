import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import Table from "./components/Table/Table";

const App: React.FC<{}> = () => {


  return (
    <div>
      <header>
        <Container maxWidth="xl">
          <Typography variant="h4">
            Coding Challenge
          </Typography>
        </Container>
        <Divider sx={{ borderBottomWidth: 1, borderColor: '#000', my: 1 }} />
      </header>
      <main>
        <Container maxWidth="xl">
          <Table />
        </Container>
      </main>
    </div>
  );
};

export default App;

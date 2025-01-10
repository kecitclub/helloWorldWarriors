import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DisasterReportsTable from './tables';
const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to RahatSutra
      </Typography>
      <Typography variant="body1">
        Your go-to platform for disaster reporting and relief coordination.
      </Typography>
      <DisasterReportsTable/>
     
    </Container>
  );
};

export default Home;

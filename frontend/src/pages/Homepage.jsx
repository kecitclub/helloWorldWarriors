import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../images/rescuee.png';
import MapComponent from '../components/maps'; 

console.log("Helloooooooooooooooooo")
// Styled HeroSection component
const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: `url(${backgroundImage}) no-repeat center center`,
  backgroundSize: "cover",
  color: '#fff',
  textAlign: "center",
}));

const MapBox = styled(Box)(({ theme }) => ({
  width: "100%",   // You can adjust the width based on your layout
  height: "500px", // You can adjust the height as needed
  borderRadius: "8px", // Optional: for rounded corners
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: shadow for map box
}));
console.log('Errorrrrrrrrrrrrrrrrrrrr');
const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" gutterBottom>
          Stay Safe, Stay Informed
        </Typography>
        <Typography variant="h5" gutterBottom>
          A platform for real-time disaster reporting and resource management.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
          Get Started
        </Button>
      </HeroSection>

     {/* Disaster Map Section */}
     <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Disaster Areas
        </Typography>
        {/* MapBox wrapper */}
        <MapBox>
          <MapComponent /> {/* Embed the map here */}
        </MapBox>
      </Container>
      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 6 }} id="about">
      <Typography variant="h4" align="center" gutterBottom>
      About Us
    </Typography>
    <Typography variant="body1">
      Disaster management is critical to saving lives and reducing damages during emergency situations.
    </Typography>
    </Container>
    

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Real-Time Reporting</Typography>
            <Typography variant="body1">
              Report disasters in real-time to alert others and coordinate responses.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Resource Management</Typography>
            <Typography variant="body1">
              Allocate and track resources effectively during emergencies.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Geo-Tagging & Analytics</Typography>
            <Typography variant="body1">
              Analyze disaster zones and response effectiveness with interactive maps.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Step 1: Report</Typography>
            <Typography variant="body1">
              Users report disasters with details and location.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Step 2: Respond</Typography>
            <Typography variant="body1">
              Authorities and volunteers are alerted to respond quickly.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Step 3: Coordinate</Typography>
            <Typography variant="body1">
              Resources and aid are distributed efficiently.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 3, textAlign: 'center', backgroundColor: '#333', color: '#fff' }}>
        <Typography variant="body2">&copy; 2025 Disaster Management System. All Rights Reserved.</Typography>
      </Box>
      
    </>
  );
};
    

export default HomePage;

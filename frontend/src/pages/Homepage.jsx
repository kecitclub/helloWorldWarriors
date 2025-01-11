import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
//import backgroundImage from '../images/rescuee.png';
import Paper from '@mui/material/Paper';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-scroll';
import DisasterReportsTable from "../components/tables"; // Import the DisasterReportsTable component
import MapComponent from '../components/maps'; 

const disasterData = [
  { type: "Fire", count: 61, color: "red", icon: "🔥" },
  { type: "Earthquake", count: 30, color: "orange", icon: "📈" },
  { type: "Animal Incidents", count: 15, color: "orange", icon: "❓" },
  { type: "Forest Fire", count: 3, color: "orange", icon: "🔥" },
  { type: "Landslide", count: 1, color: "orange", icon: "🌄" },
];

const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", 
  width: "100%", 
  backgroundSize: "cover", 
  backgroundPosition: "center center", 
  color: "#fff",
  textAlign: "center",
}));

const MapBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  maxWidth: "800px",
  margin: "auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "2rem", 
}));

const About = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "rgba(8, 7, 7, 0.5)",
  borderRadius: "8px",
  maxWidth: "90%",
  margin: "auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "2rem",
}));

const Features = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  maxWidth: "90%",
  margin: "auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "2rem",
}));

const DisasterCount = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  maxWidth: "800px",
  margin: "auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "2rem",
}));

const CarouselItem = styled('div')({
  height: '100vh', 
  width: '100%', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexDirection: 'column', 
  textAlign: 'center', 
  color: 'white', 
});

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Carousel
          autoPlay={true}        
          infiniteLoop={true}    
          interval={8000}        
          showArrows={false}     
          showThumbs={false}     
          showStatus={false}     
        >
          {/* First Background Image */}
          <CarouselItem
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0.5, 0, 0.6), rgba(0, 0, 0, 0.5)),url(src/images/rescuee.png)',
            }}
          >
            <Typography variant="h3" gutterBottom>
              Stay Safe, Stay Informed
            </Typography>
            <Typography variant="body1" gutterBottom>
              An innovative platform that transforms disaster response by enabling real-time reporting and resource coordination
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              href="#disaster-areas"  
            >
              Get Started
            </Button>
          </CarouselItem>

          {/* Second Background Image */}
          <CarouselItem
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0.5, 0, 1), rgba(0, 0, 0, 0.5)),url(src/images/donation.jpg)', 
            }}
          >
            <Typography variant="h3" gutterBottom>
              Support Those in Need - Donate for Disaster Relief
            </Typography>
            <Typography variant="body1" gutterBottom>
              Every minute counts in a disaster. Your donation can make a life-saving difference. Join RahatSutra’s mission to provide essential aid and relief to disaster-affected areas.
            </Typography>
          </CarouselItem>

          {/* Third Background Image */}
          <CarouselItem
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0.5, 0, 1), rgba(0, 0, 0, 0.5)),url(src/images/collaboration.jpg)', 
            }}
          >
            <Typography variant="h3" gutterBottom>
              Join the Collaborative Effort to Save Lives
            </Typography>
            <Typography variant="body1" gutterBottom>
              Be part of the solution. Rahat Sutra invites you to participate in crowdsourced disaster reporting and relief, ensuring communities receive timely support and assistance.
            </Typography>
          </CarouselItem>
        </Carousel>
      </HeroSection>

      {/* Disaster Map Section */}
      <Container maxWidth="lg" sx={{ py: 6 }} id="disaster-areas" >
        <Typography variant="h4" align="center" gutterBottom>
          Disaster Areas
        </Typography>
        <MapBox>
         <MapComponent />  
        
        </MapBox>
      </Container>

      {/* Disaster Count Section */}
      <DisasterCount>
        <Typography
          variant="h6"
          align="center"
          sx={{
            backgroundColor: "#802000",
            color: "#fff",
            padding: "0.5rem",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Incident Counts
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
          {disasterData.slice(0, 3).map((disaster, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="h4" color={disaster.color}>
                  {disaster.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: disaster.color, fontWeight: "bold" }}
                >
                  {disaster.type} ({disaster.count})
                </Typography>
              </Paper>
            </Grid>
          ))}

          {disasterData.slice(3).map((disaster, index) => (
            <Grid item xs={6} md={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="h5" color={disaster.color}>
                  {disaster.icon}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: disaster.color, fontWeight: "bold" }}
                >
                  {disaster.type} ({disaster.count})
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DisasterCount>

      {/* Disaster Reports Table Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Disaster Reports
        </Typography>
        <DisasterReportsTable />
      </Container>

      {/* About Us Section */}
      <About id="about">
        <Container maxWidth="lg" sx={{ py: 6 }} >
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1">
            RahatSutra: Crowdsourced Disaster Reporting and Relief is an innovative platform aimed at revolutionizing disaster response through real-time reporting, resource management, and volunteer coordination...
          </Typography>
        </Container>
      </About>

      {/* Features Section */}
      <Features>
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
              Efficiently track and allocate resources to areas in need of support.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Volunteer Coordination</Typography>
            <Typography variant="body1">
              Easily manage and dispatch volunteers to disaster zones.
            </Typography>
          </Grid>
        </Grid>
      </Features>
    </>
  );
};

export default HomePage;

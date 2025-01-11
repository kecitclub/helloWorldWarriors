import React from 'react';
import { Typography, Button, Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../components/maps';
import Asset1 from '../assets/1.jpg'
import Asset2 from '../assets/2.jpg'
import Asset3 from '../assets/3.jpg'
import Resource from '../assets/resource.png'
import Geo from '../assets/geo.png'
import Time from '../assets/time.png'


const defaultDisasterData = [
  { type: "Fire", count: 0, color: "red", icon: "🔥" },
  { type: "Earthquake", count: 0, color: "orange", icon: "📈" },
  { type: "Animal Incidents", count: 0, color: "orange", icon: "❓" },
  { type: "Forest Fire", count: 0, color: "orange", icon: "🔥" },
  { type: "Landslide", count: 0, color: "orange", icon: "🌄" },
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
  color: "#ffffff",
  textAlign: "center",
}));


const MapBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "#ffffff",
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
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "90%",
  margin: "auto",
  //boxShadow: "0 4px 10px rgba(45, 30, 30, 0.1)",
  marginBottom: "2rem",
}));

const DisasterCount = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "#ffffff",
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

  const [disasterData, setDisasterData] = useState(defaultDisasterData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDisasterData = async () => {
      try {
        console.log(defaultDisasterData)
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/disasters/reports/count'); 
        const responseData = response.data;
        const updatedData = defaultDisasterData.map((disaster) => {
          const matchingDisaster = responseData.find((item) => item.disaster_type === disaster.type);
          return {
            ...disaster,
            count: matchingDisaster ? matchingDisaster.report_count : 0,
          };
        });
        setDisasterData(updatedData);
      } catch (error) {
        console.error('Error fetching disaster data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasterData();
  }, []);

  return (
    <>
      <HeroSection>
        <Carousel
          autoPlay={true}        
          infiniteLoop={true}    
          interval={8000}        
          showArrows={false}     
          showThumbs={false}     
          showStatus={false}     
        >
          <CarouselItem
  style={{
    backgroundImage: 'url(src/images/rescuee.png)', 
    backgroundSize: 'cover',   
    backgroundPosition: 'center', 
    height: '100vh'}}
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


          <CarouselItem
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0.5, 0, 1), rgba(0, 0, 0, 0.5)),url(src/images/donation.jpg)', 
            }}
          >
            <Typography variant="h3" gutterBottom>
            Support Those in Need - Donate for Disaster Relief
        </Typography>
        <Typography variant="body1" gutterBottom>
        Every minute counts in a disaster. Your donation can make a life-saving difference.
        Join RahatSutra’s mission to provide essential aid and relief to disaster-affected areas.
        </Typography>
          </CarouselItem>

          <CarouselItem
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0.5, 0, 1), rgba(0, 0, 0, 0.5)),url(src/images/collaboration.jpg)', // Add the third background image URL
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
     <Container maxWidth="lg" sx={{ py: 6 }} id="disaster-areas" >
        <Typography variant="h4" align="center" gutterBottom>
          Disaster Areas
        </Typography>
        <MapBox>
          <MapComponent />
        </MapBox>
      </Container>
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
              elevation={1}
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
          <Grid item xs={6} md={6} mb={4} key={index}>
            <Paper
              elevation={1}
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


    <Features>
        <Typography variant="h4" align="center" gutterBottom sx={{ paddingBottom: 3 }}>
          Key Features
        </Typography>
        
        <Grid container spacing={4}>
          
        <Grid item xs={12} md={4} container direction="column" alignItems="center">

          <img
        src= {Time}
        alt="Time"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
      />
            <Typography variant="h6">Real-Time Reporting</Typography>
            <Typography variant="body1">
              Disaster reporting and response coordination
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" alignItems="center">

          <img
        src= {Resource}
        alt="Resource"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
      />
            <Typography variant="h6">Resource Management</Typography>
            <Typography variant="body1">
            Resources Allocation and Tracking during emergencies.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" alignItems="center">

          <img
        src= {Geo}
        alt="Geo"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
      />
            <Typography variant="h6">Geo-Tagging & Analytics</Typography>
            <Typography variant="body1">
              Interactive maps with disaster zones 
            </Typography>
          </Grid>
        </Grid>
     
      
      </Features>
       
      <About id="about">
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: 'white'}}  >
      <Typography variant="h4" align="center" gutterBottom sx={{ paddingBottom: 3 }}>
      About Us
    </Typography>
    
   
    <Typography variant="body1">
       RahatSutra: Crowdsourced Disaster Reporting and Relief is an innovative platform aimed at revolutionizing disaster response through real-time reporting, resource management, and volunteer coordination. Users can report disasters with detailed information and geotagging, which is visualized on an interactive map showing disaster zones and their needs. The platform provides contact information for relevant relief agencies, enabling quicker communication and support coordination. Volunteers are matched with areas requiring assistance based on their availability and skills. RahatSutra ensures a faster, more efficient, and collaborative disaster relief process.

    </Typography>
    
    </Container>
    </About>   
      <Features>
  <Typography variant="h4" align="center" gutterBottom>
    How It Works
  </Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} md={4} container direction="column" alignItems="center">
      <img
        src= {Asset1}
        alt="Report"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
      />
      <Typography variant="h6">Step 1: Report</Typography>
      <Typography variant="body1">
        Users report disasters with details and location.
      </Typography>
    </Grid>

    <Grid item xs={12} md={4} container direction="column" alignItems="center">
      <img
        src={Asset2}
        alt="Respond"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
      />
      <Typography variant="h6">Step 2: Respond</Typography>
      <Typography variant="body1">
        Authorities and volunteers are alerted to respond quickly.
      </Typography>
    </Grid>

    <Grid item xs={12} md={4} container direction="column" alignItems="center">
      <img
        src={Asset3}
        alt="Coordinate"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
      />
      <Typography variant="h6">Step 3: Coordinate</Typography>
      <Typography variant="body1">
        Resources and aid are distributed efficiently.
      </Typography>
    </Grid>
  </Grid>
</Features>


      <Box sx={{ py: 3, textAlign: 'center', backgroundColor: '#333', color: '#fff' }}>
        <Typography variant="body2">&copy; 2025 Disaster Management System. All Rights Reserved.</Typography>
      </Box>      
    </>
  );
};
    
export default HomePage;

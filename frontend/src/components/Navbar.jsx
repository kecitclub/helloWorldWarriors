import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; 
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; 
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Scroll to 'about' section on page load if the state is passed
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  

  return (
    <AppBar position="sticky" sx={{
      background: "rgba(8, 7, 7, 0.5)", 
      backdropFilter: "blur(10px)", 
      boxShadow: "none",
       
    }}>
      <Container maxWidth="lg">
        <Toolbar>
          {/* Menu Icon (for potential mobile menu) */}
          {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}

          {/* Application Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            RahatSutra
          </Typography>

          {/* Navigation Buttons */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ marginRight: '10px' }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/#about"
            startIcon={<InfoIcon />}
            sx={{ marginRight: '10px' }}
          >
            About
          </Button>


          <Button
            color="inherit"
            component={Link}
            to="/contact"
            startIcon={<ContactMailIcon />}
            sx={{ marginRight: '10px' }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            startIcon={<PersonAddIcon />}
            sx={{ marginLeft: '10px' }}
          >
            Sign Up
          </Button>

          {/* Donor Button */}
          <Button
            color="inherit"
            component={Link}
            to="/Resources"
            startIcon={<LocalOfferIcon />}
            sx={{ marginLeft: '10px' }}
          >
            Donor
          </Button>

          {/* Report Disaster Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e62e00",  // Custom color
              color: "white",              // Text color
              marginLeft: '10px',
            }}
            component={Link}
            to="/disaster"
            startIcon={<ReportProblemIcon />}
           
          >
            Report Disaster
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

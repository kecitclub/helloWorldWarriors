import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import { useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Icon for Donor
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon for Report Disaster
import NotificationsIcon from '@mui/icons-material/Notifications'; // Icon for Notifications
import FeedbackIcon from '@mui/icons-material/Feedback'; // Icon for Feedback
import { Link } from 'react-router-dom';

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
            to="/contact-us"
            startIcon={<ContactMailIcon />}
            sx={{ marginRight: '10px' }}
          >
            Contact
          </Button>

          {/* Feedback Button */}
          <Button
            color="inherit"
            component={Link}
            to="/feedback"
            startIcon={<FeedbackIcon />}
            sx={{ marginLeft: '10px' }}
          >
            Feedback
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
              backgroundColor: "#802000",  // Custom color
              color: "white",              // Text color
              marginLeft: '10px',
            }}
            component={Link}
            to="/disaster"
            startIcon={<ReportProblemIcon />}
          >
            Report Disaster
          </Button>

          {/* Notification Icon */}
          <IconButton edge="end" color="inherit" sx={{ ml: 2 }} component={Link} to="/notifications">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

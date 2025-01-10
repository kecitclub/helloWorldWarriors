import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Icon for Donor
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon for Report Disaster
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; // Icon for Volunteer Signup
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#d32f2f' }}>
      <Container maxWidth="lg">
        <Toolbar>
          {/* Menu Icon (for potential mobile menu) */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

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
            to="/about"
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
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              color: '#1976d2',
              marginLeft: '10px',
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
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
            color="inherit"
            component={Link}
            to="/disaster"
            startIcon={<ReportProblemIcon />}
            sx={{ marginLeft: '10px' }}
          >
            Report Disaster
          </Button>
          {/* Volunteer Signup Button */}
          <Button
            color="inherit"
            component={Link}
            to="/VolunteerSignup"
            startIcon={<VolunteerActivismIcon />}
            sx={{ marginLeft: '10px' }}
          >
            Volunteer Signup
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

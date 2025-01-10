import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Icon for Donor
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon for Report Disaster
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; // Icon for Volunteer Signup
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if token exists (assuming token is stored in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home after logout
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#d32f2f', height: '60px' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '60px' }}>
          {/* Left Section: Menu Icon and Title */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              RahatSutra
            </Typography>
          </div>

          {/* Center Section: Navigation Buttons */}
          <div>
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
              to="/resources"
              startIcon={<LocalOfferIcon />}
              sx={{ marginRight: '10px' }}
            >
              Donor
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/disaster"
              startIcon={<ReportProblemIcon />}
              sx={{ marginRight: '10px' }}
            >
              Report Disaster
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/volunteer-signup"
              startIcon={<VolunteerActivismIcon />}
              sx={{ marginRight: '10px' }}
            >
              Volunteer Signup
            </Button>
          </div>

          {/* Right Section: Authentication Buttons */}
          <div>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                startIcon={<PersonAddIcon />}
                variant="outlined"
                sx={{
                  backgroundColor: '#fff',
                  color: '#1976d2',
                  '&:hover': { backgroundColor: '#e3f2fd' },
                }}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleSignOut}
                variant="outlined"
                sx={{
                  backgroundColor: '#fff',
                  color: '#1976d2',
                  '&:hover': { backgroundColor: '#e3f2fd' },
                }}
              >
                Sign Out
              </Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

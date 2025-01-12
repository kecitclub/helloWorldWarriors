import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Icon for Donor
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon for Report Disaster
import NotificationsIcon from '@mui/icons-material/Notifications'; // Icon for Notifications
import FeedbackIcon from '@mui/icons-material/Feedback'; // Icon for Feedback
import AccountCircle from '@mui/icons-material/AccountCircle'; // Icon for Logout menu
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For logout menu
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home after logout
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(8, 7, 7, 0.5)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            RahatSutra
          </Typography>

          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />} sx={{ marginRight: '10px' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/#about" startIcon={<InfoIcon />} sx={{ marginRight: '10px' }}>
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact-us" startIcon={<ContactMailIcon />} sx={{ marginRight: '10px' }}>
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/feedback" startIcon={<FeedbackIcon />} sx={{ marginLeft: '10px' }}>
            Feedback
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/Resources"
            startIcon={<LocalOfferIcon />}
            sx={{ marginLeft: '10px' }}
          >
            Donate
          </Button>
          {!isAuthenticated ? (
            <>
          <Button
                color="inherit"
                component={Link}
                to="/signup"
                startIcon={<PersonAddIcon />}
                sx={{ marginLeft: '10px' }}
              >
                Sign Up
              </Button>
            </>
          ) : (<></>)}

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#e62e00',
              color: 'white',
              marginLeft: '10px',
            }}
            component={Link}
            to="/disaster"
            startIcon={<ReportProblemIcon />}
          >
            Report Disaster
          </Button>

          {!isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                startIcon={<PersonAddIcon />}
                sx={{ marginLeft: '10px' }}
              >
                Log In
              </Button>
            </>
          ) : (
            <>
              {/* Notifications Button */}
              <IconButton edge="end" color="inherit" sx={{ ml: 2 }} component={Link} to="/notifications">
                <NotificationsIcon />
              </IconButton>

              {/* Account Circle for Logout */}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenu}
                sx={{ ml: 2 }}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

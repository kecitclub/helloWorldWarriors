import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission logic, e.g., sending the data to a backend
    console.log('Form Data:', formData);
    setOpenSnackbar(true);
    setFormData({ name: '', email: '', message: '' }); // Clear the form after submission
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center">
        {/* Left side with image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url('/src/images/contactus.jpg')`, // Replace with your image URL
            backgroundSize: 'fit',
            backgroundPosition: 'right',
            height: '100vh', // Make it take full height
            display: { xs: 'none', md: 'block' }, // Hide image on small screens
          }}
        />

        {/* Right side with contact form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              mt: 5,
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              sx={{ fontWeight: 'bold' }}
            >
              Contact Us
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Have questions? We’d love to hear from you. Fill out the form below!
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    type="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for form submission success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;

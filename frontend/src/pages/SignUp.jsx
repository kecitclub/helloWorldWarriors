import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    password: '',
    re_password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.re_password) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    const userPayload = {
      email: formData.email,
      phone_number: formData.phone_number,
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      password: formData.password,
      re_password: formData.re_password,
    };
    console.log('Signup Payload:', userPayload);
    try {
      // Send signup request
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', userPayload);
      
      alert('Signup successful!');
      navigate('/Login');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs" // Compact form size
      sx={{
        marginTop: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        padding: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontFamily: 'Roboto', // Same font as Resources page
          fontWeight: 'bold',
        }}
      >
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Re-enter Password"
          name="re_password"
          type="password"
          value={formData.re_password}
          onChange={handleChange}
          required
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: '1rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            backgroundColor: '#C0392B', // Reddish Maroon color
            '&:hover': {
              backgroundColor: '#E74C3C', // Lighter red for hover
            },
          }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};

export default Signup;

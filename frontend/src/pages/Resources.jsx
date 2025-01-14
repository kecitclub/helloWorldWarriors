import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Resources = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
    category: '', // category will be sent as an object with a "name" key
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [availableCategories, setAvailableCategories] = useState([
    'Electronics',
    'Furniture',
    'Books',
    'Clothing',
    'Food',
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleAddResource = () => {
    if (
      formData.name &&
      formData.quantity &&
      formData.description &&
      formData.category
    ) {
      const newItem = {
        name: formData.name,
        quantity: parseInt(formData.quantity, 10),
        description: formData.description,
        category: { name: formData.category }, // Category as a dictionary
      };

      setItems([...items, newItem]);
      setFormData({
        name: '',
        quantity: '',
        description: '',
        category: '',
      });
    } else {
      alert('Please fill out all fields before adding a resource.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dropOffLocation || !pickUpLocation) {
      alert('Please fill out the drop-off and pick-up locations.');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one resource before submitting.');
      return;
    }

    setLoading(true);

    const payload = {
      drop_off_location: dropOffLocation,
      pick_up_location: pickUpLocation,
      items, // Send the items array directly
    };

    try {
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));
      const response = await axios.post(
        'http://127.0.0.1:8000/resources/resources/',
        payload
      );
      console.log('Resources Created:', response.data);
      alert('Resources created successfully!');
      setItems([]);
      setDropOffLocation('');
      setPickUpLocation('');
    } catch (error) {
      console.error(
        'Error creating resources:',
        error.response?.data || error.message
      );
      alert(
        `Failed to create resources: ${
          error.response?.data?.detail || 'Please try again.'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"  // Adjusted the maxWidth to make the form more compact
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
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
        Create New Resources
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Location Fields */}
        <TextField
          fullWidth
          margin="normal"
          label="Drop-off Location"
          value={dropOffLocation}
          onChange={(e) => setDropOffLocation(e.target.value)}
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
          label="Pick-up Location"
          value={pickUpLocation}
          onChange={(e) => setPickUpLocation(e.target.value)}
          required
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />

        <Box mt={2}>
          <Select
            fullWidth
            value={formData.category}
            onChange={handleCategoryChange}
            displayEmpty
            required
            sx={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {availableCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Resource Fields */}
        <TextField
          fullWidth
          margin="normal"
          label="Resource Name"
          name="name"
          value={formData.name}
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
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
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
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          multiline
          rows={4}
          sx={{
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            },
          }}
        />

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '1rem' }}
          onClick={handleAddResource}
          sx={{
            borderRadius: '8px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#c0392b',
              color: '#fff',
            },
          }}
        >
          Add Resource
        </Button>

        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Added Resources:
        </Typography>
        <Box>
          {items.map((item, index) => (
            <Typography key={index}>
              {index + 1}. Name: {item.name} - Quantity: {item.quantity} - Description: {item.description} - Category: {item.category.name}
            </Typography>
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
          disabled={loading}
          sx={{
            borderRadius: '8px',
            fontWeight: 'bold',
            backgroundColor: '#C0392B', 
            '&:hover': {
              backgroundColor: '#E74C3C', 
            },
          }}
        >
          {loading ? 'Submitting...' : 'Submit All Resources'}
        </Button>
      </form>
    </Container>
  );
};

export default Resources;

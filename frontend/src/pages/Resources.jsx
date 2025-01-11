import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Chip } from '@mui/material';
import axios from 'axios';

const Resources = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
    categories: [],
  });

  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [dropOffLocation, setDropOffLocation] = useState(''); // Set Drop-off Location
  const [pickUpLocation, setPickUpLocation] = useState(''); // Set Pick-up Location

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (category && !formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
      setCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((category) => category !== categoryToRemove),
    });
  };

  const handleAddResource = () => {
    if (formData.name && formData.quantity && formData.description) {
      setResources([...resources, { ...formData, dropOffLocation, pickUpLocation }]);
      setFormData({
        name: '',
        quantity: '',
        description: '',
        categories: [],
      });
    } else {
      alert('Please fill out all fields before adding a resource.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://127.0.0.1:8000/resources', { resources });
      console.log('Resources Created:', response.data);
      alert('Resources Created Successfully!');
      setResources([]);
    } catch (error) {
      console.error('Error creating resources:', error);
      alert('Failed to create resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
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
        />
        <TextField
          fullWidth
          margin="normal"
          label="Pick-up Location"
          value={pickUpLocation}
          onChange={(e) => setPickUpLocation(e.target.value)}
          required
        />

        {/* Resource Fields */}
        <TextField
          fullWidth
          margin="normal"
          label="Resource Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
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
        />

        <Box mt={2}>
          <TextField
            label="Add Category"
            value={category}
            onChange={handleCategoryChange}
            variant="outlined"
            size="small"
            style={{ marginRight: '8px' }}
          />
          <Button variant="outlined" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Box>

        <Box mt={2}>
          <Typography variant="body2">Categories:</Typography>
          {formData.categories.map((category, index) => (
            <Chip
              label={category}
              key={index}
              onDelete={() => handleRemoveCategory(category)}
              style={{ margin: '4px' }}
            />
          ))}
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '1rem' }}
          onClick={handleAddResource}
        >
          Add Resource
        </Button>

        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Added Resources:
        </Typography>
        <Box>
          {resources.map((resource, index) => (
            <Typography key={index}>
              {index + 1}. {resource.name} - {resource.quantity} - {resource.description} - Drop-off: {resource.dropOffLocation} - Pick-up: {resource.pickUpLocation}
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
        >
          {loading ? 'Submitting...' : 'Submit All Resources'}
        </Button>
      </form>
    </Container>
  );
};

export default Resources;

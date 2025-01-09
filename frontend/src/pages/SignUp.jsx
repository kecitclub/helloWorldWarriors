import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isVolunteer: false,
    availability: false,
    coverageRadius: "",
    occupation: "",
    serviceType: "",
    experience: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.isVolunteer) {
      console.log("Volunteer Data:", formData);
      alert("Volunteer Signup successful!");
      navigate("/thank-you");
    } else {
      console.log("User Data:", formData);
      alert("Signup successful!");
      navigate("/thank-you");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* General User Fields */}
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
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
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isVolunteer"
              checked={formData.isVolunteer}
              onChange={handleChange}
            />
          }
          label="Are you a volunteer?"
        />

        {/* Volunteer-Specific Fields */}
        {formData.isVolunteer && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Volunteer Information
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Type of Service to Provide"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Past Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
              }
              label="Are you currently available?"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Coverage Radius (in km)"
              name="coverageRadius"
              type="number"
              value={formData.coverageRadius}
              onChange={handleChange}
              required
            />
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Signup;

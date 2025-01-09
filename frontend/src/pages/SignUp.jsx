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
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    password: "",
    re_password: "", // Added re-enter password field
    address: "",
    is_volunteer: false,
    response_radius: "",
    days_available: [],
    time_preferences: {},
    is_part_time: false,
    emergency_contact_name: "",
    emergency_contact_no: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.re_password) {
      alert("Passwords do not match!");
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
      is_volunteer: formData.is_volunteer,
    };

    try {
      // Step 1: Create the user
      const userResponse = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        userPayload
      );

      if (formData.is_volunteer) {
        // Step 2: If volunteer, create the volunteer profile
        const volunteerPayload = {
          user: userResponse.data.id, // Assuming the user ID is returned in the response
          address: formData.address,
          response_radius: formData.response_radius,
          days_available: formData.days_available,
          time_preferences: formData.time_preferences,
          is_part_time: formData.is_part_time,
          emergency_contact_name: formData.emergency_contact_name,
          emergency_contact_no: formData.emergency_contact_no,
        };

        await axios.post("http://127.0.0.1:8000/volunteer/register/", volunteerPayload);
      }

      alert("Signup successful!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
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
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={formData.last_name}
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
          label="Phone Number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
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
          label="Re-enter Password"
          name="re_password"
          type="password"
          value={formData.re_password}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="is_volunteer"
              checked={formData.is_volunteer}
              onChange={handleChange}
            />
          }
          label="Are you a volunteer?"
        />

        {/* Volunteer-Specific Fields */}
        {formData.is_volunteer && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Volunteer Information
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Response Radius (in km)"
              name="response_radius"
              type="number"
              value={formData.response_radius}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Days Available (comma-separated)"
              name="days_available"
              value={formData.days_available}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  days_available: e.target.value.split(",").map((day) => day.trim()),
                })
              }
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Emergency Contact Name"
              name="emergency_contact_name"
              value={formData.emergency_contact_name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Emergency Contact Number"
              name="emergency_contact_no"
              value={formData.emergency_contact_no}
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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default Signup;

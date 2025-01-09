import React, { useState } from "react";
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define disaster types and severity levels for dropdowns
const disasterTypes = [
  { value: "Fire", label: "Fire" },
  { value: "Earthquake", label: "Earthquake" },
  { value: "Flood", label: "Flood" },
];

const severityLevels = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const DisasterReportForm = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    dateOccurred: "",
    location: "",
    magnitude: "",
    severityLevel: "",
    description: "",
    reporterFirstName: "",
    reporterLastName: "",
    reporterContact: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `Latitude: ${latitude}, Longitude: ${longitude}`,
          });
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

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

    try {
      const response = await axios.post("https://your-backend-api.com/disaster-reports", formData);
      console.log("Disaster Report Submitted:", response.data);

      // Navigate to the landing page with location data
      if (formData.location) {
        const [latitude, longitude] = formData.location
          .replace("Latitude: ", "")
          .replace("Longitude: ", "")
          .split(", ")
          .map((coord) => coord.trim());
        navigate(`/landing?lat=${latitude}&lng=${longitude}`);
      }

      alert("Disaster Report Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting disaster report:", error);
      alert("Failed to submit the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Disaster Report Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Disaster Type Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Disaster Type</InputLabel>
          <Select
            name="disasterType"
            value={formData.disasterType}
            onChange={handleChange}
            label="Disaster Type"
          >
            {disasterTypes.map((disaster) => (
              <MenuItem key={disaster.value} value={disaster.value}>
                {disaster.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Occurred */}
        <TextField
          fullWidth
          margin="normal"
          label="Date Occurred"
          type="date"
          name="dateOccurred"
          value={formData.dateOccurred}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />

        {/* Location (Fetch current location button) */}
        <TextField
          fullWidth
          margin="normal"
          label="Location (Coordinates or Address)"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          InputProps={{
            endAdornment: (
              <Button
                onClick={getCurrentLocation}
                variant="contained"
                color="secondary"
                style={{ marginLeft: "1rem" }}
              >
                Use Current Location
              </Button>
            ),
          }}
        />

        {/* Magnitude (Only visible for Earthquake) */}
        {formData.disasterType === "Earthquake" && (
          <TextField
            fullWidth
            margin="normal"
            label="Magnitude"
            name="magnitude"
            type="number"
            value={formData.magnitude}
            onChange={handleChange}
            required
          />
        )}

        {/* Severity Level Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Severity Level</InputLabel>
          <Select
            name="severityLevel"
            value={formData.severityLevel}
            onChange={handleChange}
            label="Severity Level"
          >
            {severityLevels.map((severity) => (
              <MenuItem key={severity.value} value={severity.value}>
                {severity.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Description of the Disaster */}
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

        {/* Reporter Info */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Reporter First Name"
              name="reporterFirstName"
              value={formData.reporterFirstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Reporter Last Name"
              name="reporterLastName"
              value={formData.reporterLastName}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          margin="normal"
          label="Reporter Contact"
          name="reporterContact"
          value={formData.reporterContact}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Container>
  );
};

export default DisasterReportForm;

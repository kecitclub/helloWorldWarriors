import React, { useState, useEffect } from "react";
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define severity levels for dropdowns
const severityLevels = [
  { value: "Low", label: "Low" },
  { value: "Moderate", label: "Moderate" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

const DisasterReportForm = () => {
  const [formData, setFormData] = useState({
    disaster: null, // Disaster will be fetched from backend
    severityLevel: "Low",
    description: "",
    reporterFirstName: "",
    reporterLastName: "",
    reporterContact: "",
    requiresResource: false,
    volunteersType: "",
    urgencyLevel: "Medium",
    resourcesNeeded: "",
  });

  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch disasters from backend
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/disasters/");
        setDisasters(response.data); // Assuming the response is an array of disaster objects
      } catch (error) {
        console.error("Error fetching disasters:", error);
        alert("Failed to fetch disaster data. Please try again.");
      }
    };
    fetchDisasters();
  }, []);

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
      // Step 1: Create the disaster report
      const disasterReportResponse = await axios.post("http://127.0.0.1:8000/disasters/report/", {
        disaster: formData.disaster, // Fetch the disaster ID from the selected disaster
        description: formData.description,
        reporter_first_name: formData.reporterFirstName,
        reporter_last_name: formData.reporterLastName,
        reporter_contact: formData.reporterContact,
        severity_level: formData.severityLevel,
        latitude: 0, // Set latitude as needed (this can be dynamic based on user's location)
        longitude: 0, // Set longitude as needed (this can be dynamic based on user's location)
      });
      console.log("Disaster Report Created:", disasterReportResponse.data);

      // Step 2: Create the resource request if resources are required
      if (formData.requiresResource) {
        const resourceRequestData = {
          disaster_report: disasterReportResponse.data.id,  // Linking the disaster report ID
          requires_volunteer: formData.requiresResource,
          volunteers_type: formData.volunteersType ? JSON.parse(formData.volunteersType) : [],
          urgency_level: formData.urgencyLevel,
          resources_needed: formData.resourcesNeeded ? JSON.parse(formData.resourcesNeeded) : [],
        };

        const resourceRequestResponse = await axios.post("http://127.0.0.1:8000/resources/create/", resourceRequestData);
        console.log("Resource Request Created:", resourceRequestResponse.data);
      }

      // Step 3: Navigate to the landing page (or show a success message)
      alert("Disaster Report Submitted Successfully!");
      navigate("/landing"); // Change to the desired path after submission
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
          <InputLabel>Disaster</InputLabel>
          <Select
            name="disaster"
            value={formData.disaster}
            onChange={handleChange}
            label="Disaster"
          >
            {disasters.map((disaster) => (
              <MenuItem key={disaster.id} value={disaster.id}>
                {disaster.disaster_type} - {disaster.date_occurred}
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

        {/* Resource Request Section */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Requires Resource</InputLabel>
          <Select
            name="requiresResource"
            value={formData.requiresResource}
            onChange={handleChange}
            label="Requires Resource"
          >
            <MenuItem value={false}>No</MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
          </Select>
        </FormControl>

        {formData.requiresResource && (
          <>
            {/* Volunteer Type */}
            <TextField
              fullWidth
              margin="normal"
              label="Volunteer Types (JSON format)"
              name="volunteersType"
              value={formData.volunteersType}
              onChange={handleChange}
            />
            {/* Resources Needed */}
            <TextField
              fullWidth
              margin="normal"
              label="Resources Needed (JSON format)"
              name="resourcesNeeded"
              value={formData.resourcesNeeded}
              onChange={handleChange}
            />
            {/* Urgency Level */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Urgency Level</InputLabel>
              <Select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                label="Urgency Level"
              >
                {severityLevels.map((severity) => (
                  <MenuItem key={severity.value} value={severity.value}>
                    {severity.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

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

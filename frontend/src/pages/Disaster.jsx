import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
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
    disaster: "", // Disaster ID
    severityLevel: "Low",
    description: "",
    reporterFirstName: "",
    reporterLastName: "",
    reporterContact: "",
    requiresResource: "false", // Stored as a string for compatibility
    volunteersType: "[]", // JSON array as string
    urgencyLevel: "Low",
    resourcesNeeded: "[]", // JSON array as string
  });

  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch disasters from the backend
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/disasters/");
        setDisasters(response.data);
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

  const safeParseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.reporterContact || !/^[0-9]+$/.test(formData.reporterContact)) {
      alert("Please enter a valid contact number.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create the disaster report
      const disasterReportResponse = await axios.post(
        "http://127.0.0.1:8000/disasters/add/",
        {
          disaster: formData.disaster,
          description: formData.description,
          reporter_first_name: formData.reporterFirstName,
          reporter_last_name: formData.reporterLastName,
          reporter_contact: formData.reporterContact,
          severity_level: formData.severityLevel,
          latitude: 0, // Replace with actual coordinates if available
          longitude: 0, // Replace with actual coordinates if available
        }
      );

      console.log("Disaster Report Created:", disasterReportResponse.data);

      // Step 2: Create resource request if required
      if (formData.requiresResource === "true") {
        const resourceRequestResponse = await axios.post(
          `http://127.0.0.1:8000/request-resource/${disasterReportResponse.data.id}/`,
          {
            disaster_report: disasterReportResponse.data.id,
            requires_volunteer: formData.requiresResource === "true",
            volunteers_type: safeParseJSON(formData.volunteersType),
            urgency_level: formData.urgencyLevel,
            resources_needed: safeParseJSON(formData.resourcesNeeded),
          }
        );

        console.log("Resource Request Created:", resourceRequestResponse.data);
      }

      // Step 3: Navigate to the landing page
      alert("Disaster Report Submitted Successfully!");
      navigate("/");
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

        {/* Description */}
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
            onChange={(e) =>
              setFormData({
                ...formData,
                requiresResource: e.target.value,
              })
            }
            label="Requires Resource"
          >
            <MenuItem value="false">No</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
          </Select>
        </FormControl>

        {formData.requiresResource === "true" && (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Volunteer Types (JSON)"
              name="volunteersType"
              value={formData.volunteersType}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Resources Needed (JSON)"
              name="resourcesNeeded"
              value={formData.resourcesNeeded}
              onChange={handleChange}
            />
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
          style={{
            backgroundColor: "#800000", // Maroon color
            color: "#fff", // White text
            fontFamily: "Arial, sans-serif", // Same font as before
            fontSize: "16px", // Same font size as before
            padding: "12px", // Adjust padding for consistent size
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
            transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition for background color and shadow
            "&:hover": {
              backgroundColor: "#660000", // Darker maroon on hover
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // More prominent shadow on hover
            },
          }}
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

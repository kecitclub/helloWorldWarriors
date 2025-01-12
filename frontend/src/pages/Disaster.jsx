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

const severityLevels = [
  { value: "Low", label: "Low" },
  { value: "Moderate", label: "Moderate" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

const DisasterReportForm = () => {
  const [formData, setFormData] = useState({
    disaster: "", 
    severityLevel: "Low",
    description: "",
    reporterFirstName: "",
    reporterLastName: "",
    reporterContact: "",
    requiresResource: "false", 
    volunteersType: "[]", 
    urgencyLevel: "Low",
    resourcesNeeded: "[]", 
  });

  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/disasters/");
        const uniqueDisasters = response.data.reduce((acc, current) => {
          const exists = acc.some(
            (item) =>
              item.disaster_type === current.disaster_type &&
              item.date_occurred === current.date_occurred
          );
          if (!exists) {
            acc.push(current);
          }
    
          return acc;
        }, []);
        setDisasters(uniqueDisasters);
      } catch (error) {
        console.error("Error fetching disasters:", error);
        alert("Failed to fetch disaster data. Please try again.");
      }
    };
    fetchDisasters();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            latitude: latitude, longitude: longitude,
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
    const updatedValue = name === 'volunteersType' || name === 'resourcesNeeded' 
    ? value.split(',').map(item => item.trim())  
    : value;

    
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;
  
    try {
      const response = await axios.get(url);
      const data = response.data;
  
      if (data.length > 0) {
        const { latitude, longitude } = data[0];
        setFormData({
          ...formData,
          latitude: latitude, longitude: longitude,
        });
      } else {
        console.error('No results found for the location.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }

    if (!formData.reporterContact || !/^[0-9]+$/.test(formData.reporterContact)) {
      alert("Please enter a valid contact number.");
      setLoading(false);
      return;
    }

    try {
      const selectedDisaster = disasters.find((disaster) => disaster.id === formData.disaster);
      const disasterReportResponse = await axios.post(
        "http://127.0.0.1:8000/disasters/report-disaster/",
        {
          disaster: formData.disaster,
          description: formData.description,
          reporter_first_name: formData.reporterFirstName,
          reporter_last_name: formData.reporterLastName,
          reporter_contact: formData.reporterContact,
          severity_level: formData.severityLevel,
          latitude: selectedDisaster ? selectedDisaster.latitude : 0,
          longitude: selectedDisaster ? selectedDisaster.longitude : 0,
        }
      );

      if (formData.requiresResource === "true") {
        const resourceRequestResponse = await axios.post(
          `http://127.0.0.1:8000/disasters/request-resource/${disasterReportResponse.data.id}/`,
          {
            disaster_report: disasterReportResponse.data.id,
            requires_volunteer: formData.requiresResource === "true",
            volunteers_type: formData.volunteersType,
            urgency_level: formData.urgencyLevel,
            resources_needed: formData.resourcesNeeded,
          }
        );

        console.log("Resource Request Created:", resourceRequestResponse.data);
      }
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
                style={{ marginLeft: "1rem" }}
              >
                Use Current Location
              </Button>
            ),
          }}
        />

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
              label="Volunteer Types"
              name="volunteersType"
              placeholder="Use comma to separate"
              value={formData.volunteersType}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Resources Needed"
              placeholder="Use comma to separate"
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
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
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Container>
  );
};

export default DisasterReportForm;


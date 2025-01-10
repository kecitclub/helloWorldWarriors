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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const safeParseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  const validateFields = () => {
    if (!formData.reporterContact || !/^[0-9]+$/.test(formData.reporterContact)) {
      alert("Please enter a valid contact number.");
      return false;
    }

    if (formData.requiresResource === "true") {
      try {
        safeParseJSON(formData.volunteersType);
        safeParseJSON(formData.resourcesNeeded);
      } catch {
        alert("Please enter valid JSON for volunteers and resources.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setLoading(true);

    try {
      const disasterReportResponse = await axios.post(
        "http://127.0.0.1:8000/disasters/add/",
        {
          disaster: formData.disaster,
          description: formData.description,
          reporter_first_name: formData.reporterFirstName,
          reporter_last_name: formData.reporterLastName,
          reporter_contact: formData.reporterContact,
          severity_level: formData.severityLevel,
          latitude: 0,
          longitude: 0,
        }
      );

      if (formData.requiresResource === "true") {
        await axios.post(
          `http://127.0.0.1:8000/request-resource/${disasterReportResponse.data.id}/`,
          {
            disaster_report: disasterReportResponse.data.id,
            requires_volunteer: true,
            volunteers_type: safeParseJSON(formData.volunteersType),
            urgency_level: formData.urgencyLevel,
            resources_needed: safeParseJSON(formData.resourcesNeeded),
          }
        );
      }

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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
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

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
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
              setFormData((prev) => ({
                ...prev,
                requiresResource: e.target.value,
              }))
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

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#800000",
            "&:hover": { backgroundColor: "#660000" },
          }}
          fullWidth
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Container>
  );
};

export default DisasterReportForm;

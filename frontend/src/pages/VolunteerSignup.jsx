import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";

const daysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeOptions = ["Morning", "Afternoon", "Evening"];
const volunteeringAreas = [
  "Community Service",
  "Environmental Conservation",
  "Education",
  "Healthcare",
  "Animal Welfare",
  "Emergency Response",
];

const VolunteerSignup = () => {
  const [formData, setFormData] = useState({
    address: "",
    response_radius: 20,
    days_available: [],
    time_preferences: [],
    is_part_time: false,
    emergency_contact_name: "",
    emergency_contact_no: "",
    occupation: "",
    volunteering_area: [],
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

  const handleSelectChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const volunteerPayload = {
      address: formData.address,
      response_radius: formData.response_radius,
      days_available: formData.days_available,
      time_preferences: formData.time_preferences,
      is_part_time: formData.is_part_time,
      emergency_contact_name: formData.emergency_contact_name,
      emergency_contact_no: formData.emergency_contact_no,
      occupation: formData.occupation,
      volunteering_area: formData.volunteering_area,
    };

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You are not logged in. Please log in first.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/users/volunteer/register/",
        volunteerPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Volunteer signup successful!");
      setFormData({
        address: "",
        response_radius: 20,
        days_available: [],
        time_preferences: [],
        is_part_time: false,
        emergency_contact_name: "",
        emergency_contact_no: "",
        occupation: "",
        volunteering_area: [],
      });

      navigate("/"); // Navigate to homepage after successful signup
    } catch (error) {
      console.error("Volunteer Signup Error:", error.response?.data || error.message);
      alert("Volunteer signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: 2,
        padding: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "Roboto", // Same font as previous pages
          fontWeight: "bold",
        }}
      >
        Volunteer Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
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
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Days Available</InputLabel>
          <Select
            multiple
            value={formData.days_available}
            onChange={(e) => handleSelectChange(e, "days_available")}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {daysOptions.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Time Preferences</InputLabel>
          <Select
            multiple
            value={formData.time_preferences}
            onChange={(e) => handleSelectChange(e, "time_preferences")}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Volunteering Areas</InputLabel>
          <Select
            multiple
            value={formData.volunteering_area}
            onChange={(e) => handleSelectChange(e, "volunteering_area")}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {volunteeringAreas.map((area) => (
              <MenuItem key={area} value={area}>
                {area}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="is_part_time"
              checked={formData.is_part_time}
              onChange={handleChange}
            />
          }
          label="Part-Time Volunteer"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Emergency Contact Name"
          name="emergency_contact_name"
          value={formData.emergency_contact_name}
          onChange={handleChange}
          required
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Emergency Contact Number"
          name="emergency_contact_no"
          value={formData.emergency_contact_no}
          onChange={handleChange}
          required
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
<Box mt={2}>
  <Button
    type="submit"
    variant="contained"
    style={{
      backgroundColor: "#800000", // Maroon color
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition for background color and shadow
      "&:hover": {
        backgroundColor: "#660000", // Darker maroon on hover
        boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // More prominent shadow on hover
      },
    }}
    fullWidth
    disabled={loading}
  >
    {loading ? "Submitting..." : "Submit"}
  </Button>
</Box>

      </form>
    </Container>
  );
};

export default VolunteerSignup;

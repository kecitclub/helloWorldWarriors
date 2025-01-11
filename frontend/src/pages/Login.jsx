import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error messages
  const navigate = useNavigate();

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
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid email or password. Please try again.");
        }
        throw new Error("Failed to log in. Please try again later.");
      }

      const data = await response.json();
      const { access, refresh } = data;

      // Store the tokens in localStorage (consider using a secure storage mechanism)
      localStorage.setItem("authToken", access);
      localStorage.setItem("refreshToken", refresh);

      alert("Login successful!");
      navigate("/"); // Navigate to homepage after successful login
    } catch (err) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" align="center" style={{ marginTop: "1rem" }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
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

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  FormHelperText,
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
    re_password: "",
  });

  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const minUppercase = 1;
    const minLowercase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;

    const uppercaseRegex = /[A-Z]/g;
    const lowercaseRegex = /[a-z]/g;
    const numbersRegex = /[0-9]/g;
    const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

    const isLengthSufficient = password.length >= minLength;
    const hasUppercase = (password.match(uppercaseRegex) || []).length >= minUppercase;
    const hasLowercase = (password.match(lowercaseRegex) || []).length >= minLowercase;
    const hasNumbers = (password.match(numbersRegex) || []).length >= minNumbers;
    const hasSpecialChars = (password.match(specialCharsRegex) || []).length >= minSpecialChars;

    const isStrong = isLengthSufficient && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars;

    setPasswordStrengthMessage(
      isStrong
        ? ""
        : "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    );

    return isStrong;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.re_password) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    const isStrongPassword = checkPasswordStrength(formData.password);
    if (!isStrongPassword) {
      alert("Create a strong password");
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
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/users/", userPayload);
      alert("Signup successful! Please activate your account.");
      navigate("/activate"); // Navigate to the activate page after successful signup
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
        {passwordStrengthMessage && (
          <FormHelperText error>{passwordStrengthMessage}</FormHelperText>
        )}
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

   

  

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Rating,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setFeedback({ ...feedback, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call)
    console.log("Feedback Submitted:", feedback);
    setSnackbarOpen(true);
    setFeedback({ name: "", email: "", rating: 0, message: "" });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Side: Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url('/src/images/feedback.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" }, // Hide image on small screens
        }}
      ></Grid>

      {/* Right Side: Feedback Form */}
      <Grid
        item
        xs={12}
        md={6}
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            Feedback Form
          </Typography>
          <Typography variant="body1" textAlign="center" gutterBottom>
            Your feedback helps us improve disaster relief and response efforts.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { marginBottom: 2 },
            }}
          >
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              value={feedback.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={feedback.email}
              onChange={handleChange}
            />
            <Typography component="legend" sx={{ marginBottom: 1 }}>
              How would you rate our disaster response efforts?
            </Typography>
            <Rating
              name="rating"
              value={feedback.rating}
              onChange={handleRatingChange}
              size="large"
            />
            <TextField
              label="Your Feedback"
              name="message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
              value={feedback.message}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FeedbackForm;

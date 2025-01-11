import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import AboutImage from "../images/rescuee.png"; 

const AboutUs = () => {
  return (
    <Box
      id="about"
      sx={{
        backgroundColor: "#333333", 
        color: "#fff", 
        py: 10,
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1.2,
            }}
          >
            RahatSutra at a glance
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Revolutionizing disaster reporting,
            resource management, and volunteer coordination.
          </Typography>
        </Box>

        {/* Content Section */}
        <Grid container spacing={6} alignItems="center">
          {/* Left: Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={AboutImage} 
              alt="About Us Image"
              sx={{
                width: "100%",
                borderRadius: 4,
                boxShadow: 4,
                mb: 4,
              }}
            />
          </Grid>

          {/* Right: Text Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 3, fontSize: "2rem" }}
            >
              Creative solutions for disaster management
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.2rem", lineHeight: 1.8, mb: 3 }}
            >
              RahatSutra is an innovative platform dedicated to improving
              disaster response. It uses cutting-edge technology for
              crowdsourced disaster reporting, resource tracking, and
              coordination of relief efforts.
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.7)" }}
            >
              Join us in building a more resilient future through real-time
              updates, geotagged disaster reports, and an interactive map to
              guide relief efforts where they’re needed most.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;

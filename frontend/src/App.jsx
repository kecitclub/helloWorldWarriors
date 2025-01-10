import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import your custom theme
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage"; 
import SignUp from "./pages/SignUp"; 
import Resources from "./pages/Resources"; 
import DisasterReportForm from "./pages/Disaster"; 

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/disaster" element={<DisasterReportForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

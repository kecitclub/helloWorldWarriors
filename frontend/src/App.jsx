import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage"; // Ensure the file name matches
import SignUp from "./pages/SignUp"; // Ensure the file name matches
import Resources from "./pages/Resources"; // Import the new ResourcesPage
import DisasterReportForm from "./pages/Disaster"; // Import the Disaster report form page

const App = () => {
  return (
    
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resources" element={<Resources />} /> {/* Add the Resources page route */}
        <Route path="/disaster" element={<DisasterReportForm />} /> {/* Add the Disaster report route */}
      </Routes>
    </Router>

  );
};

export default App;

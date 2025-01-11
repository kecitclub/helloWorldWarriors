import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage"; 
import SignUp from "./pages/SignUp"; 
import Resources from "./pages/Resources"; 
import DisasterReportForm from "./pages/Disaster"; 
import VolunteerSignup from "./pages/VolunteerSignup"; 
import Login from "./pages/Login"; 
import DisasterReportsTable from "./components/tables";
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

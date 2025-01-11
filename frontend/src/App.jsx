import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage"; 
import SignUp from "./pages/SignUp"; 
import Resources from "./pages/Resources"; 
import DisasterReportForm from "./pages/Disaster"; 
import ContactUs from "./pages/ContactUs";
import FeedbackForm from "./pages/Feedbackform";
import AppLogin from "./pages/Login";
import Activate from "./pages/Activate";

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
          <Route path="/resources" element={<Resources />} />
          <Route path="/disaster" element={<DisasterReportForm />} />
          <Route path="/contact-us" element = {<ContactUs/>} />
          <Route path="/feedback" element = {<FeedbackForm/>} />
          <Route path="/login" element = {<AppLogin/>} />
          <Route path="/activate" element = {<Activate/>} />

        </Routes>
      </Router>

};

export default App;

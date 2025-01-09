import React from 'react';
import Navbar from './components/Navbar';
import Home from "./pages/Homepage";  // Ensure the file is 'Home.jsx'


const App = () => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default App;

// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home/home";
import { AuthProvider } from "../contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

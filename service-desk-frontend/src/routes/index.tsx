// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login";
import { AuthProvider } from "../contexts/AuthContext";
import Home from "../pages/home/home"; 
import Opening from "../pages/opening/opening"; 
import Search from "../pages/search/search";



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/opening" element={<Opening />} />
          <Route path="/search" element={<Search />} />

          {/* Rota para links inválidos */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

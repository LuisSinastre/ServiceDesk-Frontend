// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login";
import Home from "../pages/home/home"; // Corrigindo para importar como default
import { AuthProvider } from "../contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Rota para links inválidos */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

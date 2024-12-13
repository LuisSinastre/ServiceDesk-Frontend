// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { AuthProvider } from "../contexts/AuthContext";
import ApprovalPage from "../pages/approval/approval";
import SearchPage from "../pages/search/search";
import OpeningPage from "../pages/opening/opening";
import HomePage from "../pages/home/home";



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/opening" element={<OpeningPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/approval" element={<ApprovalPage />} />

          {/* Rota para links inválidos */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

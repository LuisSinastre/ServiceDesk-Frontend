// src/pages/search/search.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const Search: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/search");
    }
  }, [isAuthenticated, navigate]);


  return (
    <h1>Olá Mundo Search</h1>
  );
};

export default Search;

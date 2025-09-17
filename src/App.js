import './App.css';
import Minepage from './Minepage';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import RecipeDetails from './RecipeDetails';

function RecipeList({ recipes }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          style={{
            width: "300px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
            background: "#fff",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div style={{ padding: "20px" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>{recipe.strMeal}</h3>
            <button
              style={{
                background: "#e53c71ff",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "10px 30px",
                fontSize: "1rem",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            >
              Recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("chicken");
  const navigate = useNavigate();

  const handleSearch = (text) => {
    setSearchText(text);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals || []))
      .catch((err) => console.error(err));
    navigate("/"); // search দিলে home এ নিয়ে যাবে
  };

  React.useEffect(() => {
    handleSearch(searchText);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Minepage onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<RecipeList recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
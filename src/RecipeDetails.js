import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals ? data.meals[0] : null));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", background: "#fff", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", padding: "30px" }}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: "100%", borderRadius: "12px" }} />
      <h2>{recipe.strMeal}</h2>
      <p><b>Category:</b> {recipe.strCategory}</p>
      <p><b>Area:</b> {recipe.strArea}</p>
      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
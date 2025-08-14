import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle"; // ⬅ new import

const API = {
  search: (q) =>
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`)
      .then((r) => r.json()),
};

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  async function onSearch(q) {
    if (!q.trim()) return;
    setQuery(q);
    setError("");
    setLoading(true);
    try {
      const data = await API.search(q);
      setRecipes(data.meals || []);
      if (!data.meals) setError("No recipes found. Try another search.");
    } catch (e) {
      setError("Could not fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const heading = useMemo(
    () => (query ? `Results for “${query}”` : "Search delicious recipes"),
    [query]
  );

  return (
    <div className="app">
      <div className="app-overlay" aria-hidden="true" />
      <header className="header">
        <h1>🍴 Yummy Recipes</h1>
        <p>Find meals fast, read reviews, and cook happy.</p>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>

      <main className="container" role="main">
        <SearchBar onSearch={onSearch} />

        {loading && <p className="muted">Loading recipes…</p>}
        {error && <p className="error" role="alert">{error}</p>}

        <h2 className="results-heading">{heading}</h2>

        <section className="grid" aria-label="Recipe results">
          {recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} onOpen={() => setActiveRecipe(meal)} />
          ))}
        </section>
      </main>

      <Footer />

      {activeRecipe && (
        <RecipeModal meal={activeRecipe} onClose={() => setActiveRecipe(null)} />
      )}
    </div>
  );
}

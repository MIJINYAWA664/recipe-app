import React from "react";

export default function RecipeCard({ meal, onOpen }) {
  return (
    <article className="card" tabIndex="0" aria-label={meal.strMeal} onClick={onOpen} onKeyDown={(e) => e.key === "Enter" && onOpen()}>
      <div className="card-media">
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{meal.strMeal}</h3>
        <p className="meta">
          <span>{meal.strCategory || "Meal"}</span> •{" "}
          <span>{meal.strArea || "Global"}</span>
        </p>
        <button className="btn" type="button" aria-label={`Open ${meal.strMeal}`}>View</button>
      </div>
    </article>
  );
}

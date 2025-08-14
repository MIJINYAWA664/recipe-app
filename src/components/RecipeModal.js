import React, { useEffect, useMemo } from "react";
import Reviews from "./Reviews";

function extractIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${ing}${mea ? ` — ${mea}` : ""}`);
  }
  return list;
}

export default function RecipeModal({ meal, onClose }) {
  // trap scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const ingredients = useMemo(() => extractIngredients(meal), [meal]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${meal.strMeal} details`}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-header">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div>
            <h2>{meal.strMeal}</h2>
            <p className="meta">{meal.strCategory} • {meal.strArea}</p>
            {meal.strSource && (
              <a href={meal.strSource} target="_blank" rel="noreferrer" className="link">Original Source</a>
            )}
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="link">YouTube Tutorial</a>
            )}
          </div>
        </div>

        <div className="modal-content">
          <div>
            <h3>Ingredients</h3>
            <ul className="ingredients">
              {ingredients.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>

          <div>
            <h3>Instructions</h3>
            <p className="instructions">{meal.strInstructions}</p>
          </div>
        </div>

        <Reviews mealId={meal.idMeal} mealName={meal.strMeal} />
      </div>
    </div>
  );
}

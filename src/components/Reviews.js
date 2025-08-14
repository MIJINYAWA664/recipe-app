import React, { useEffect, useState } from "react";

const STORAGE_KEY = "recipe_reviews"; // { [mealId]: [{rating, text, date}] }

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveReviews(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export default function Reviews({ mealId, mealName }) {
  const [reviewsMap, setReviewsMap] = useState({});
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  useEffect(() => {
    setReviewsMap(loadReviews());
  }, []);

  const reviews = reviewsMap[mealId] || [];

  function addReview(e) {
    e.preventDefault();
    const entry = { rating: Number(rating), text: text.trim(), date: new Date().toISOString() };
    if (!entry.text) return;
    const next = { ...reviewsMap, [mealId]: [entry, ...reviews] };
    setReviewsMap(next);
    saveReviews(next);
    setText("");
    setRating(5);
  }

  const avg =
    reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <section className="reviews">
      <h3>Reviews {avg ? <span className="avg">({avg}★)</span> : null}</h3>

      <form className="review-form" onSubmit={addReview}>
        <label>
          Rating
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r}★</option>)}
          </select>
        </label>

        <label className="grow">
          Your review
          <input
            type="text"
            placeholder={`What did you think about ${mealName}?`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <button type="submit" className="btn">Post</button>
      </form>

      <ul className="review-list">
        {reviews.length === 0 && <li className="muted">Be the first to review this recipe.</li>}
        {reviews.map((r, i) => (
          <li key={i} className="review-item">
            <div className="stars">{`${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}`}</div>
            <p>{r.text}</p>
            <span className="date">{new Date(r.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

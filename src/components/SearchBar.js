import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className="searchbar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="q" className="sr-only">Search recipes</label>
      <input
        id="q"
        type="text"
        placeholder="Try 'chicken', 'pasta', 'rice'…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search recipes"
      />
      <button type="submit" aria-label="Search">Search</button>
    </form>
  );
}

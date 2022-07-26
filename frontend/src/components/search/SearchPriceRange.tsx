import React from "react";

export default function SearchPriceRange() {
  return (
    <input
      type="range"
      className="form-range"
      min="0"
      max="5"
      step="0.5"
      id="customRange3"
    />
  );
}

import React, { useState } from "react";
import "./SearchPriceRange.css";

export default function SearchPriceRange() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(200);

  return (
    <div className="price-range-container">
      <input
        type="range"
        className="form-range"
        min="0"
        max="5"
        step="0.5"
        id="customRange3"
      />

      <ul className="min-max-container">
        <li id="min">£{min}</li>
        <li id="max">£{max}</li>
      </ul>
    </div>
  );
}

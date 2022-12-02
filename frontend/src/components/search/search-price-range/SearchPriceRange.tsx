import React, { useEffect, useState } from "react";
import "./SearchPriceRange.css";

export default function SearchPriceRange(props: any) {
  const [max, setMax] = useState(200);

  useEffect(() => {
    // props.storeMaxPrice(max);
  });

  const handleChange = () => {
    const i: any = document.querySelector(".price-range");
    setMax(i.value);
  };

  return (
    <div className="price-range-container">
      <input
        type="range"
        className="form-range price-range"
        min="0"
        max="200"
        step="10"
        id="customRange3"
        onChange={handleChange}
      />

      <ul className="min-max-container">
        <li id="min">£0</li>
        <li id="max">£{max}</li>
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ResultsControls.css";

interface Props {
  salons: { id: number; name: string; post_code: string }[];
  currentResult: number;
}

function ResultsControls({ salons, currentResult }: Props) {
  return (
    <div className="controls-container">
      <i className="bi bi-filter-circle"></i>
      <span className="results-total">
        {currentResult} of {salons.length}
      </span>
      <Link to="/">
        <i className="bi bi-arrow-return-left"></i>
      </Link>
    </div>
  );
}

export default ResultsControls;

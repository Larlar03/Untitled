import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ResultsNav.css";

function ResultsNav(props: any) {
  return (
    <div className="controls-container">
      <i className="bi bi-filter-circle"></i>
      <span className="results-counter">
        {props.currentResult} of {props.salons.length}
      </span>
      <Link to="/">
        <i className="bi bi-arrow-return-left"></i>
      </Link>
    </div>
  );
}

export default ResultsNav;

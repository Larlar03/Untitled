import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ResultsControls.css";

function ResultsControls(props: any) {
  const [salons, setSalons] = useState<{ name: string; city: string }[]>([
    { name: "Francesco Group", city: "Wolverhampton" },
    { name: "Redcoco Hair Studio ", city: "Walsall" },
    { name: "K& J Hair Studio", city: "Walsall" },
  ]);
  return (
    <div className="controls-container">
      <i className="bi bi-filter-circle"></i>
      <span className="results-total">
        {props.currentResult} of {salons.length}
      </span>
      <Link to="/">
        <i className="bi bi-arrow-return-left"></i>
      </Link>
    </div>
  );
}

export default ResultsControls;

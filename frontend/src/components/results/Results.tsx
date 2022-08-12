import React, { useState } from "react";
import ResultsCard from "./ResultsCard";
import ResultsControls from "./ResultsControls";

function Results() {
  const [currentResult, setCurrentResult] = useState<number>(0);
  const [salons, setSalons] = useState<{ name: string; city: string }[]>([
    { name: "Francesco Group", city: "Wolverhampton" },
    { name: "Redcoco Hair Studio ", city: "Walsall" },
    { name: "K& J Hair Studio", city: "Walsall" },
  ]);

  const storeCurrentResult = (result: number) => {
    setCurrentResult(result);
  };

  return (
    <div className="results-container">
      <ResultsControls currentResult={currentResult} />
      {/* Map Results cards in a carousel */}
      <ResultsCard salons={salons} storeCurrentResult={storeCurrentResult} />
    </div>
  );
}

export default Results;

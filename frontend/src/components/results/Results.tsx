import React, { useState, useEffect } from "react";
import ResultsCard from "./ResultsCard";
import ResultsControls from "./ResultsControls";
import Axios from "axios";

function Results() {
  const [currentResult, setCurrentResult] = useState<number>(1);
  const [salons, setSalons] = useState<{ name: string; post_code: string }[]>([
    { name: "", post_code: "" },
    { name: "", post_code: "" },
    { name: "", post_code: "" },
  ]);

  const storeCurrentResult = (result: number) => {
    result === salons.length - 1
      ? setCurrentResult(1)
      : setCurrentResult(currentResult + 1);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/salons`)
      .then((response) => {
        setSalons(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className="results-container">
      <ResultsControls salons={salons} currentResult={currentResult} />
      {/* Map Results cards in a carousel */}
      <ResultsCard salons={salons} storeCurrentResult={storeCurrentResult} />
    </div>
  );
}

export default Results;

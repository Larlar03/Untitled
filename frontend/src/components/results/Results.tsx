import React, { useState, useEffect } from "react";
import ResultsCard from "./ResultsCard";
import ResultsControls from "./ResultsControls";
import Axios from "axios";

function Results() {
  const [currentResult, setCurrentResult] = useState<number>(1);
  const [data, setData] = useState<
    { id: number; name: string; post_code: string }[]
  >([
    { id: 0, name: "", post_code: "" },
    { id: 1, name: "", post_code: "" },
    { id: 2, name: "", post_code: "" },
  ]);
  const [salons, setSalons] = useState<
    { id: number; name: string; post_code: string }[]
  >([
    { id: 0, name: "", post_code: "" },
    { id: 1, name: "", post_code: "" },
    { id: 2, name: "", post_code: "" },
  ]);

  const storeCurrentResultPrev = (id: number) => {
    id === 1 ? setCurrentResult(salons.length) : setCurrentResult(id - 1);
  };

  const storeCurrentResultNext = (id: number) => {
    id > salons.length - 1 ? setCurrentResult(1) : setCurrentResult(id + 1);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/salons`)
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    setSalons(data);
    console.log(salons);
  }, [data]);

  return (
    <div className="results-container">
      <ResultsControls salons={salons} currentResult={currentResult} />
      {/* Map Results cards in a carousel */}
      <ResultsCard
        salons={salons}
        storeCurrentResultPrev={storeCurrentResultPrev}
        storeCurrentResultNext={storeCurrentResultNext}
      />
    </div>
  );
}

export default Results;

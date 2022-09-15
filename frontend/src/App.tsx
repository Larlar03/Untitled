import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import Axios from "axios";

const App: React.FC = () => {
  const [city, setCity] = useState<any>("");

  const setAppCityState = (cityName: any) => {
    setCity(cityName["label"]);
    console.log("city:" + city);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/salons/${city}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SearchPage setAppCityState={setAppCityState} />}
        />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

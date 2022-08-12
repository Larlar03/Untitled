import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import Axios from "axios";

function App() {
  const [city, setCity] = useState("");

  const setAppCityState = (cityName: string) => {
    setCity(cityName);
    console.log(city);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/location/${city}`)
      .then((response) => {
        console.log(response.data[0]);
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
}

export default App;

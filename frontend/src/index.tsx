import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import SearchContainer from "./pages/SearchPage";
import ResultsContainer from "./pages/ResultsPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchContainer />} />
        <Route path="/results" element={<ResultsContainer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

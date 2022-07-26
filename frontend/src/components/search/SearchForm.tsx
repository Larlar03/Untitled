import React from "react";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";
import SearchPriceRange from "./SearchPriceRange";
import "./SearchForm.css";

export default function SearchForm() {
  return (
    <div className="search-form-container">
      <form action="submit">
        <div className="mb-3">
          <SearchInput />
        </div>
        <div className="mb-3">
          <SearchOptions />
        </div>
        <div className="mb-3">
          <SearchPriceRange />
        </div>
        <button id="submit-button" type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

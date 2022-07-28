import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";
import SearchPriceRange from "./SearchPriceRange";
import "./SearchForm.css";

export default function SearchForm() {
  const [options, setOptions] = useState<Array<string>>([]);

  const storeOptions = (arr: string[]) => {
    setOptions(arr);
<<<<<<< HEAD
=======
    console.log("array stored");
>>>>>>> 5fb1855c1e77202c4c740e57a5a27e4d4088a1d2
    console.log(options);
  };

  return (
    <div className="search-form-container">
      <form action="submit">
        <div className="mb-3">
          <SearchInput />
        </div>
        <div className="mb-3">
          <SearchOptions storeOptions={storeOptions} />
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

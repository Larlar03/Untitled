import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";
import SearchPriceRange from "./SearchPriceRange";
import "./SearchForm.css";

export default function SearchForm(props: any) {
  const [options, setOptions] = useState<Array<string>>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [toggleDisabled, setToggleDisabled] = useState<boolean>(true);

  const storeOptions = (arr: string[]) => {
    setOptions(arr);
    // console.log(options);
  };

  const storeMaxPrice = (max: number) => {
    setMaxPrice(max);
    // console.log(maxPrice);
  };

  const storeCity = (city: string) => {
    setCity(city);
    // console.log(city);
  };

  const sendToApp = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.setAppCityState(city);
  };

  return (
    <div className="search-form-container">
      <form action="submit">
        <div className="mb-3">
          <SearchInput storeCity={storeCity} />
        </div>
        <div className="mb-3">
          <SearchOptions storeOptions={storeOptions} />
        </div>
        <div className="mb-3">
          <SearchPriceRange storeMaxPrice={storeMaxPrice} />
        </div>
        <button
          onClick={sendToApp}
          id="submit-button"
          type="submit"
          className="btn btn-primary"
          disabled={toggleDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

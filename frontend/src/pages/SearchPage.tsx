import Header from "../components/header/Header";
import SearchForm from "../components/search/SearchForm";
import "./SearchPage.css";

interface Props {
  setAppCityState(cityName: string): void;
}

export default function SearchPage({ setAppCityState }: Props) {
  return (
    <div className="container-fluid" id="SearchPage">
      <div className="content-container">
        <div className="content" id="search-content">
          <Header />
          <SearchForm setAppCityState={setAppCityState} />
        </div>
      </div>
    </div>
  );
}

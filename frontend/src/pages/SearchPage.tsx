import Header from "../components/header/Header";
import SearchForm from "../components/search/SearchForm";
import "./SearchPage.css";

export default function SearchPage(props: any) {
  return (
    <div className="container-fluid" id="SearchPage">
      <div className="content-container">
        <div className="content" id="search-content">
          <Header />
          <SearchForm setAppCityState={props.setAppCityState} />
        </div>
      </div>
    </div>
  );
}

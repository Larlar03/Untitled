import Header from "../components/header/Header";
import SearchForm from "../components/search/SearchForm";
import "./SearchPage.css";

export default function SearchPage() {
  return (
    <div className="container-fluid" id="SearchPage">
      <div className="content-container">
        <div className="content">
          <Header />
          <SearchForm />
        </div>
      </div>
    </div>
  );
}

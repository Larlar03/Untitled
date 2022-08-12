import Header from "../components/header/Header";
import Results from "../components/results/Results";
import "./ResultsPage.css";

export default function ResultsPage() {
  return (
    <div className="container-fluid" id="SearchPage">
      <div className="content-container">
        <div className="content" id="results-content">
          <Header />
          <Results />
        </div>
      </div>
    </div>
  );
}

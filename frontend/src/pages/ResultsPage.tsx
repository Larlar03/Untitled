import Header from "../components/header/Header";
import Results from "../components/results/Results";
import "./ResultsPage.css";

export default function ResultsPage(props: any) {
    return (
        <div className="container-fluid" id="ResultsPage">
            <div id="results-content">
                <Header />
                <Results results={props.results} />
            </div>
        </div>
    );
}

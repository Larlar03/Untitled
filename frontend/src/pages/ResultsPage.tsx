import Header from "../components/header/Header";
import Results from "../components/results/Results";
import Navbar from "../components/navbar/Navbar";

const ResultsPage = (props: any) => {
	return (
		<>
			<Navbar />
			<div className="">
				<div id="results-content h-full my-8">
					<Header subheading="Results" />
					<Results results={props.results} />
				</div>
			</div>
		</>
	);
};

export default ResultsPage;

import Header from "../components/header/Header";
import Results from "../components/results/Results";
import Navbar from "../components/navbar/Navbar";

const ResultsPage = (props: any) => {
	return (
		<>
			<Navbar />
			<div className="my-2">
				<Header subheading="Results" />
				<Results results={props.results} />
			</div>
		</>
	);
};

export default ResultsPage;

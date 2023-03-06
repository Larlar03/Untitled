import { useState } from "react";
import ResultsCard from "./ResultsCard";
import ResultsNav from "./ResultsNav";
import Salons from "../../types/salons";

const Results = (props: any) => {
	const [currentResult, setCurrentResult] = useState<number>(1);

	const storeCurrentResultPrev = (id: number) => {
		props.results &&
			(id === 1
				? setCurrentResult(props.results)
				: setCurrentResult(id - 1));
	};

	const storeCurrentResultNext = (id: number) => {
		props.results &&
			(id > props.results.length - 1
				? setCurrentResult(1)
				: setCurrentResult(id + 1));
	};

	return (
		<>
			{props.results && props.results.length > 0 ? (
				<>
					<ResultsNav
						salons={props.results}
						currentResult={currentResult}
					/>
					<ResultsCard
						salons={props.results}
						storeCurrentResultPrev={storeCurrentResultPrev}
						storeCurrentResultNext={storeCurrentResultNext}
					/>
				</>
			) : (
				<div>No Results</div>
			)}
		</>
	);
};

export default Results;

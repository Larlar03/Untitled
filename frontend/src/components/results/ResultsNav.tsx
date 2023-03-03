import { Link } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

import "./ResultsNav.css";

const ResultsNav = (props: any) => {
	return (
		<div className="controls-container">
			<i className="bi bi-filter-circle"></i>
			<span className="results-counter">
				{props.currentResult} of {props.salons.length}
			</span>
			<Link to="/">
				<ArrowUturnLeftIcon className="h-6 w-6 text-purple-100" />
			</Link>
		</div>
	);
};

export default ResultsNav;

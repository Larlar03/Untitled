import { Link } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const ResultsNav = (props: any) => {
	return (
		<div className="w-7/12 flex flex-row flex-nowrap justify-between mt-10 mb-4 mx-auto text-xl md:w-80 md:font-bold">
			<AdjustmentsHorizontalIcon className="h-6 w-6 text-main-100 hover:text-main-200 cursor-pointer" />
			<span>
				{props.currentResult} of {props.salons.length}
			</span>
			<Link to="/">
				<ArrowUturnLeftIcon className="h-6 w-6 text-main-100 hover:text-main-200" />
			</Link>
		</div>
	);
};

export default ResultsNav;

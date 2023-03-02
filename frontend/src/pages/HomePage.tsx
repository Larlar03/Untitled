import Header from "../components/header/Header";
import SearchForm from "../components/search/SearchForm";
import Navbar from "../components/navbar/Navbar";
import "./HomePage.css";

export default function SearchPage(props: any) {
	return (
		<>
			<Navbar />
			<div id="Page" className="h-screen max-w-md p-0 mx-auto">
				<div id="PageCard" className="px-11">
					<Header subheading="Ultrices ornare neque in" />
					<SearchForm
						onCitySelection={props.onCitySelection}
						onServiceSelection={props.onServiceSelection}
						navigateToResults={props.navigateToResults}
					/>
				</div>
				<div id="PageCardShadow"></div>
			</div>
		</>
	);
}

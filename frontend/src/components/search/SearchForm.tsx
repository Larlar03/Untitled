import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CtaButton from "../buttons/CtaButton";
import SearchInput from "./search-input/SearchInput";
import SearchOptions from "./search-options/SearchOptions";

const SearchForm = (props: any) => {
	const [options, setOptions] = useState<Array<string>>([]);
	const [city, setCity] = useState<any>();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const navigate = useNavigate();

	useEffect(() => {
		city && options.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
	}, [city, options]);

	const selectCity = (label: any) => {
		props.onCitySelection(label.label);
		setCity(label.label);
	};

	const selectOptions = (options: string[]) => {
		props.onOptionSelection(options);
		setOptions(options);
	};

	return (
		<div className="mt-16">
			<form action="submit">
				<div className="mb-3">
					<SearchInput selectCity={selectCity} />
				</div>
				<div className="mb-4">
					<SearchOptions selectOptions={selectOptions} />
				</div>
				<CtaButton
					text="Submit"
					handleClick={() => navigate("/results")}
					isDisabled={isDisabled}
					type="submit"
				/>
			</form>
		</div>
	);
};

export default SearchForm;

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "../../../constants/cities";
import "./SearchInput.css";

const SearchInput = (props: any) => {
	return (
		<div>
			<Autocomplete
				onChange={(event, label) => props.selectCity(label)}
				disablePortal
				options={cities}
				sx={{ width: 300 }}
				renderInput={(params) => (
					<TextField {...params} label="Search for a city..." />
				)}
			/>
		</div>
	);
};

export default SearchInput;

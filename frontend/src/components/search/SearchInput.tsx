import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Trie from "../autocomplete/Trie";
import cities from "../autocomplete/cities";
import "./SearchInput.css";

export default function SearchInput(props: any) {
  const [citySelection, setCitySelection] = useState<any>(null);

  useEffect(() => {
    props.storeCity(citySelection);
  }, [citySelection]);

  return (
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="addon-wrapping">
        <i className="bi bi-search"></i>
      </span>
      <div id="search-input-container">
        <Autocomplete
          onChange={(event, label) => setCitySelection(label)}
          disablePortal
          options={cities}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search for a city..." />
          )}
        />
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "../../../constants/cities";
import "./SearchInput.css";

export default function SearchInput(props: any) {
    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
                <i className="bi bi-search"></i>
            </span>
            <div id="search-input-container">
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
        </div>
    );
}

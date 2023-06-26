import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from '../../../constants/cities';
import regions from '../../../constants/regions';
import './search-input.css';

interface Props {
    selectLocation: (label: any) => void;
}

const SearchInput = (props: Props) => {
    const [searchOptions, setSearchOptions] = useState<any>([]);

    useEffect(() => {
        setSearchOptions(regions.concat(cities));
        console.log(searchOptions);
    }, []);

    return (
        <div>
            <Autocomplete
                onChange={(event, label) => props.selectLocation(label)}
                disablePortal
                options={searchOptions}
                groupBy={(searchOption: any) => searchOption.type}
                getOptionLabel={(searchOption: any) => searchOption.label}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label='Search for a city or region' />}
            />
        </div>
    );
};

export default SearchInput;

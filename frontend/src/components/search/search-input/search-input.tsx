import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from '../../../constants/cities';
import regions from '../../../constants/regions';
import CitiesRegion from '../../../types/cities-regions.ts';

import './search-input.css';

interface Props {
    selectLocation: (label: string) => void;
}

const SearchInput = (props: Props) => {
    const [searchOptions, setSearchOptions] = useState<CitiesRegion[]>([]);

    useEffect(() => {
        setSearchOptions(regions.concat(cities));
    }, []);

    return (
        <div>
            <Autocomplete
                data-testid='autocomplete'
                onChange={(event, label) => props.selectLocation(label)}
                disablePortal
                options={searchOptions}
                groupBy={(searchOption: any) => searchOption.type}
                getOptionLabel={(searchOption: any) => searchOption.label}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label='Search in a city or region' />}
            />
        </div>
    );
};

export default SearchInput;

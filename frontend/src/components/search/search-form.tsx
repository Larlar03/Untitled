import { useEffect, useState } from 'react';

import CtaButton from '../buttons/cta-button/cta-button';
import SearchInput from './search-input/search-input';
import SearchOptions from './search-options/search-options';

import CitiesRegion from '../../types/cities-regions.ts';
import Service from '../../types/service.ts';

interface Props {
    getStudios: (location: string | undefined, services: string[]) => void;
    services: Service[] | undefined;
}

const SearchForm = (props: Props) => {
    const [options, setOptions] = useState<string[]>([]);
    const [location, setLocation] = useState<string>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        location && options.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
    }, [location, options]);

    const selectLocation = (label: CitiesRegion | null) => {
        setLocation(label?.label);
    };

    const selectOptions = (options: string[]) => {
        setOptions(options);
        console.log(options);
    };

    return (
        <div className='mt-12'>
            <form action='submit'>
                <div className='mb-3'>
                    <SearchInput selectLocation={selectLocation} />
                </div>
                <div>
                    <SearchOptions selectOptions={selectOptions} services={props.services} />
                </div>
                <div className='mx-auto w-[100%] md:w-[90%]'>
                    <CtaButton
                        text='Search'
                        handleClick={(e: React.MouseEvent<HTMLButtonElement>) => [
                            e.preventDefault(),
                            props.getStudios(location, options)
                        ]}
                        isDisabled={isDisabled}
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchForm;

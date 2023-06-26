import { useEffect, useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import SearchInput from './search-input/SearchInput';
import SearchOptions from './search-options/SearchOptions';

interface Props {
    getStudios: (location: string, services: string[]) => void;
}

const SearchForm = (props: Props) => {
    const [options, setOptions] = useState<Array<string>>([]);
    const [location, setLocation] = useState<any>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        location && options.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
    }, [location, options]);

    const selectLocation = (label: any) => {
        setLocation(label.label);
        // console.log('location', location);
    };

    const selectOptions = (options: string[]) => {
        setOptions(options);
        // console.log('options', options);
    };

    // ;

    return (
        <div className='mt-16'>
            <form action='submit'>
                <div className='mb-3'>
                    <SearchInput selectLocation={selectLocation} />
                </div>
                <div className='mb-4'>
                    <SearchOptions selectOptions={selectOptions} />
                </div>
                <CtaButton
                    text='Submit'
                    handleClick={(e) => [e.preventDefault(), props.getStudios(location, options)]}
                    isDisabled={isDisabled}
                    type='submit'
                />
            </form>
        </div>
    );
};

export default SearchForm;

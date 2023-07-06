import { useEffect, useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import SearchInput from './search-input/search-input';
import SearchOptions from './search-options/search-options';
import services from '../../constants/services.ts';

interface Props {
    getStudios: (location: string | undefined, services: string[]) => void;
}

const SearchForm = (props: Props) => {
    const [options, setOptions] = useState<Array<string>>([]);
    const [location, setLocation] = useState<string>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        location && options.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
    }, [location, options]);

    const selectLocation = (label: any) => {
        setLocation(label.label);
    };

    const selectOptions = (options: string[]) => {
        setOptions(options);
    };

    // ;

    return (
        <div className='mt-12'>
            <form action='submit'>
                <div className='mb-3'>
                    <SearchInput selectLocation={selectLocation} />
                </div>
                <SearchOptions selectOptions={selectOptions} services={services} />
                <CtaButton
                    text='Search'
                    handleClick={(e: React.MouseEvent<HTMLButtonElement>) => [
                        e.preventDefault(),
                        props.getStudios(location, options)
                    ]}
                    isDisabled={isDisabled}
                    type='submit'
                />
            </form>
        </div>
    );
};

export default SearchForm;

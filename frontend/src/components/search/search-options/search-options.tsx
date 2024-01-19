import { useEffect, useState } from 'react';
import OptionButton from '../../buttons/option-button/option-button';

interface Props {
    selectOptions: (options: string[]) => void;
    options: string[];
}

const SearchOptions = (props: Props) => {
    const [options, setOptions] = useState<Array<string>>([]);

    useEffect(() => {
        props.selectOptions(options);
    }, [options]);

    const handleOptionClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault();
        const selection = event.currentTarget.textContent;

        setOptions((prev: any) => {
            if (prev.includes(selection)) {
                return prev.filter((option: any) => option !== selection);
            } else {
                return [...prev, selection];
            }
        });

        applyStyles(event);
    };

    const applyStyles = (event: React.MouseEvent<HTMLElement>): void => {
        const currentSelection = event.currentTarget;
        currentSelection.classList.contains('active')
            ? currentSelection.classList.remove('active')
            : currentSelection.classList.add('active');
    };

    return (
        <div className='list-none my-9 mx-auto p-0 flex flex-row flex-wrap justify-center gap-2.5 text-center md:gap-2'>
            {props.options?.map((service: string, i: number) => (
                <OptionButton key={i} optionName={service} handleClick={handleOptionClick} />
            ))}
        </div>
    );
};

export default SearchOptions;

import './option-button.css';

interface Props {
    optionName: string;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const OptionButton = (props: Props) => {
    return (
        <li
            onClick={props.handleClick}
            id={props.optionName}
            data-testid='option-button'
            className='hover-grow rounded-full p-2 border-[1px] border-medium-slate-blue font-medium font-spacegrotesk hover:cursor-pointer hover:bg-medium-slate-blue'
        >
            {props.optionName}
        </li>
    );
};

export default OptionButton;

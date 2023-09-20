import './option-button.css';

interface Props {
    serviceName: string;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const OptionButton = (props: Props) => {
    return (
        <li
            onClick={props.handleClick}
            id={props.serviceName}
            data-testid='option-button'
            className='hover-grow rounded-full p-2 border-[1px] border-medium-slate-blue font-medium font-spacegrotesk hover:cursor-pointer hover:bg-medium-slate-blue'
        >
            {props.serviceName}
        </li>
    );
};

export default OptionButton;

// className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"

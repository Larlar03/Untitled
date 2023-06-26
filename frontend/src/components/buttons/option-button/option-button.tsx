import './option-button.css';

interface Props {
    serviceName: string;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const OptionButton = (props: Props) => {
    return (
        <li onClick={props.handleClick} id={props.serviceName} className='option-button hover-grow rounded-full'>
            {props.serviceName}
        </li>
    );
};

export default OptionButton;

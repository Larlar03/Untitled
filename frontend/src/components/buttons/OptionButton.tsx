import "./OptionButton.css";

const OptionButton = (props: any) => {
	return (
		<li
			onClick={props.handleClick}
			key={props.key}
			id={props.serviceName}
			className="option-button hover-grow rounded-full"
		>
			{props.serviceName}
		</li>
	);
};

export default OptionButton;
